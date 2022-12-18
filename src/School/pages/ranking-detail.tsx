import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Container from "../../components/Container";
import Menus from "../../components/Nav/MenuOpcoes";
import { useRouter } from "next/router";
import { IComents, IEscolaProfile } from "../../types/IEscola";

import { MdPhotoCamera, MdStar } from "react-icons/md";
import formatRank from "../../utils/formatRank";

import TabReputacao from "../components/Tabs/Reputacao";
import Comentarios, {
  ICommentCallBackProps,
  IReplyedCommentCallBackProps,
  IPropLikeAndDislike,
} from "../components/Tabs/Comentarios";
import Localizacao from "../components/Tabs/Localizacao";

import EvaluationMode, {
  IOncloseProps,
} from "../components/EvaluationMode";

import { toast } from "react-toastify";

import firebase from "../../database";
import {
  getFirestore,
  doc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

import { logEvent, getAnalytics } from "firebase/analytics";

import { faker } from "@faker-js/faker";

import useAuth from "../../User/hooks/useAuth";
import IRankSchool from "../../types/IRankSchool";
import School, {ISchoolProps} from "../entities/school";

type ISchoolDetail = {
  exists: boolean;
  detail: ISchoolProps;
};

const RankingDetail: React.FC<ISchoolDetail> = ({
  detail,
}) => {
  const [schoolDetail, setScholDetail] = React.useState<ISchoolProps>(detail);
  const [loading, setLoading] = React.useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logIn } = useAuth();
  const { query } = useRouter();

  const _onOpen = React.useCallback(() => {
    if (!user) {
      logIn();
    } else {
      onOpen();
    }
  }, [logIn, onOpen, user]);

  const Reputacao = React.useMemo(() => {
    const rank = formatRank(schoolDetail.rank);

    if (!schoolDetail.rank) return;

    if (rank === IRankSchool.Ruim || rank === IRankSchool.Pessimo)
      return (
        <>
          <Flex alignItems="center" justifyContent="center">
            <Text>Reputação geral: </Text> {"  "}{" "}
            <Icon as={MdStar} boxSize={5} color="#874A9F" />
            {schoolDetail.rank}
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" textColor="#874A9F">
            {rank}
          </Text>
        </>
      );

    if (rank === IRankSchool["Muito bom"]) {
      return (
        <>
          <Flex alignItems="center" justifyContent="center">
            <Text>Reputação geral: </Text> {"  "}{" "}
            <Icon as={MdStar} boxSize={5} color="#FF6736" />
            {schoolDetail.rank}
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" textColor="#FF6736">
            {rank}
          </Text>
        </>
      );
    }

    return (
      <>
        <Flex alignItems="center" justifyContent="center">
          <Text>Reputação geral: </Text> {"  "}{" "}
          <Icon as={MdStar} boxSize={5} color="#00CF9A" />
          {schoolDetail.rank}
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" textColor="#00CF9A">
          {rank}
        </Text>
      </>
    );
  }, [schoolDetail]);

  const _onClose = React.useCallback(
    async (e: IOncloseProps) => {
      try {
        if(!e) {
          onClose();
          return;
        }

        if (
          (e.modal.length && e.rankResult.infraAcessibilityResult) ||
          e.rankResult.infraRestroomResult ||
          e.rankResult.pedagogiAcessibilityResult ||
          e.rankResult.pedagogiPreparationResult
        ) {
          const db = getFirestore(firebase);

          const ref = collection(db, "evaluation");

          await addDoc(ref, {
            school: schoolDetail.id,
            form: {
              ...e,
              user_id: user.id,
            },
          });
          toast.success("Avaliação enviada com sucesso. Obrigado!", {
            theme: "colored",
          });

          const analityc = getAnalytics(firebase);
          logEvent(analityc, "evaluation", {
            page_path: String(query.schoolName),
            page_title: schoolDetail.nome,
            user_id: user.id,
          });
        }

        onClose();
      } catch (error) {
        toast.error("Tivemos um problema em enviar sua avaliação", {
          theme: "colored",
        });
        console.log(error);
      }
    },
    [onClose, query, schoolDetail, user]
  );

  const _onComentEnter = React.useCallback(
    async ({ comment, tags }: ICommentCallBackProps) => {
      if (!user) {
        alert("Necessário estar logado para poder comentar");
        return;
      }

      const { comentarios, id } = schoolDetail;
      const db = getFirestore(firebase);

      const docRef = doc(db, "schools", id);

      const thisComent: IComents[] = [
        {
          _id: faker.datatype.uuid(),
          author_id: user.id,
          created_date: new Date(),
          message: comment,
          like: 0,
          dislike: 0,
          replyed: [],
          tags,
          aproved: false,
          user_dislike: [],
          user_like: [],
        },
        ...comentarios,
      ];

      await updateDoc(docRef, {
        comentarios: thisComent,
      });

      setScholDetail((old) => ({
        ...old,
        comentarios: thisComent,
      }));

      toast.success(
        "Comentário adicionado com sucesso!, nosso time irá avalia-lo",
        {
          theme: "colored",
        }
      );
    },
    [schoolDetail, user]
  );

  const addLike = React.useCallback(
    async ({ commnetId, replyedId }: IPropLikeAndDislike) => {
      try {
        if (!user || !user.id) {
          alert("Faça login para interagir com os comentários");
          return;
        }
        const { id, comentarios } = schoolDetail;
        const db = getFirestore(firebase);

        const thisComment = comentarios.find(
          (comment) => comment._id === commnetId
        );

        const thisReplyed = replyedId
          ? thisComment.replyed.find((comment) => comment._id === replyedId)
          : null;

        const userAlredyLiked = (_thisComment: { user_like: Array<string> }) =>
          _thisComment.user_like.includes(user.id);

        const thisComent = comentarios.map((comment) => {
          if (comment._id === commnetId) {
            if (!thisReplyed) {
              const _userAlredyLiked = userAlredyLiked(comment);

              const user_like = _userAlredyLiked
                ? comment.user_like.filter((el) => el !== user.id)
                : [...comment.user_like, user.id];

              const qtd = _userAlredyLiked
                ? comment.like - 1
                : comment.like + 1;

              return {
                ...comment,
                like: qtd,
                user_like: user_like,
              };
            }

            const newReplyed = comment.replyed.map((thisComment) => {
              if (thisComment._id === thisReplyed._id) {
                const _userAlredyLiked = userAlredyLiked(thisReplyed);

                const user_like = _userAlredyLiked
                  ? thisComment.user_like.filter((el) => el !== user.id)
                  : [...thisComment.user_like, user.id];

                const qtd = _userAlredyLiked
                  ? thisComment.like - 1
                  : thisComment.like + 1;

                return {
                  ...thisComment,
                  like: qtd,
                  user_like: user_like,
                };
              }
            });

            return {
              ...comment,
              replyed: newReplyed,
            };
          }
          return comment;
        });
        setScholDetail((old) => ({
          ...old,
          comentarios: thisComent,
        }));

        const docRef = doc(db, "schools", id);

        await updateDoc(docRef, {
          comentarios: thisComent,
        });

        const analityc = getAnalytics(firebase);
        logEvent(analityc, "like_comment", {
          page_path: String(query.schoolName),
          page_title: schoolDetail.nome,
          comment_id: thisComment._id,
          qtd_like: thisComment.like,
        });
      } catch (err) {
        toast.error("Ocorreu um erro ao tentarmos publicar seu comentário!");
        console.error(err);
      }
    },
    [query, schoolDetail, user]
  );

  const addDislike = React.useCallback(
    async ({ commnetId, replyedId }: IPropLikeAndDislike) => {
      try {
        if (!user && !user.id) {
          alert("Faça login para interagir com os comentários");
          return;
        }
        const { id, comentarios } = schoolDetail;
        const db = getFirestore(firebase);

        const thisComment = comentarios.find(
          (comment) => comment._id === commnetId
        );

        const thisReplyed = replyedId
          ? thisComment.replyed.find((comment) => comment._id === replyedId)
          : null;

        const userAlredyLiked = (_thisComment: {
          user_dislike: Array<string>;
        }) => _thisComment.user_dislike.includes(user.id);

        const thisComent = comentarios.map((comment) => {
          if (comment._id === commnetId) {
            if (!thisReplyed) {
              const _userAlredyLiked = userAlredyLiked(comment);

              const user_dislike = _userAlredyLiked
                ? comment.user_dislike.filter((el) => el !== user.id)
                : [...comment.user_dislike, user.id];

              const qtd = _userAlredyLiked
                ? comment.dislike - 1
                : comment.dislike + 1;

              return {
                ...comment,
                dislike: qtd,
                user_dislike,
              };
            }

            const newReplyed = comment.replyed.map((thisComment) => {
              if (thisComment._id === thisReplyed._id) {
                const _userAlredyLiked = userAlredyLiked(thisReplyed);

                const user_dislike = _userAlredyLiked
                  ? thisComment.user_dislike.filter((el) => el !== user.id)
                  : [...thisComment.user_dislike, user.id];

                const qtd = _userAlredyLiked
                  ? thisComment.dislike - 1
                  : thisComment.dislike + 1;

                return {
                  ...thisComment,
                  dislike: qtd,
                  user_dislike,
                };
              }
            });

            return {
              ...comment,
              replyed: newReplyed,
            };
          }
          return comment;
        });
        setScholDetail((old) => ({
          ...old,
          comentarios: thisComent,
        }));

        const docRef = doc(db, "schools", id);

        await updateDoc(docRef, {
          comentarios: thisComent,
        });

        const analityc = getAnalytics(firebase);
        logEvent(analityc, "unlike_comment", {
          page_path: String(query.schoolName),
          page_title: schoolDetail.nome,
          comment_id: thisComment._id,
          qtd_like: thisComment.like,
        });
      } catch (err) {
        toast.error("Ocorreu um erro ao tentarmos publicar seu comentário!");
        console.error(err);
      }
    },
    [query, schoolDetail, user]
  );

  React.useEffect(() => {
    const { nome } = detail;

    if (!!firebase) {
      const analityc = getAnalytics(firebase);
      logEvent(analityc, "page_view", {
        page_path: String(query.schoolName),
        page_title: nome,
      });
    }
  }, [query, detail]);

  const BannerSchool = () => {
    return (
      <Box w="full" h={["450px", "350px"]}>
        <Flex
          w="full"
          bg="_blue"
          h={["30%", "40%"]}
          justifyContent={["center", "flex-start"]}
          position="relative"
          px={["30px", "100px"]}
        >
          <Flex
            w="120px"
            h="120px"
            bg="#D9D9D9"
            borderRadius="50%"
            position="absolute"
            bottom="-30%"
            boxShadow="sm"
            alignItems="center"
            justifyContent="center"
            zIndex={2}
            margin="0 auto"
          >
            {schoolDetail.profile_img ? (
              <Img src={schoolDetail.profile_img} alt="Profile IMG" />
            ) : (
              <Icon as={MdPhotoCamera} boxSize={8} color="gray.600" />
            )}
          </Flex>

          {/* <Box position="absolute" right="50px" bottom="0">
            Capa
          </Box> */}
        </Flex>
        <Flex
          w="full"
          bg="white"
          flexDir={["column", "row"]}
          h="60%"
          position="relative"
          px={["50px", "100px"]}
          mt={[10, 0]}
          justifyContent="space-around"
          alignItems="center"
        >
          <Flex flexDir="column">
            <Heading textColor="gray.600" fontSize="3xl">
              {schoolDetail.nome}
            </Heading>
            <Text>{`${schoolDetail.endereco} - ${schoolDetail.cidade}`}</Text>
          </Flex>
          <Flex flexDir="column">
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #B9B9B9"
              p={4}
            >
              {Reputacao}
            </Flex>
            <Flex mt={3} alignItems="center" justifyContent="center">
              <Button onClick={_onOpen} colorScheme="teal">
                Deixe sua opinião
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  };

  const _onComentReplyedEnter = React.useCallback(
    async (e: IReplyedCommentCallBackProps) => {
      if (!user) {
        alert("Necessário estar logado para poder comentar");
        return;
      }

      const { coment_id, comment } = e;

      const { comentarios } = schoolDetail;

      const db = getFirestore(firebase);

      const docRef = doc(db, "schools", schoolDetail.id);

      const thisComent = comentarios.map((coment) => {
        if (coment._id === coment_id) {
          coment.replyed.push({
            _id: faker.datatype.uuid(),
            author_id: user.id,
            created_date: new Date(),
            message: comment,
            like: 0,
            dislike: 0,
            aproved: false,
            user_dislike: [],
            user_like: [],
          });
        }

        return coment;
      });

      await updateDoc(docRef, {
        comentarios: thisComent,
      });

      setScholDetail((old) => ({
        ...old,
        comentarios: thisComent,
      }));

      toast.success(
        "Comentário adicionado com sucesso!, nosso time irá avalia-lo",
        {
          theme: "colored",
        }
      );

      const analityc = getAnalytics(firebase);
      logEvent(analityc, "new_comment", {
        page_path: String(query.schoolName),
        page_title: schoolDetail.nome,
        qtd_comments: thisComent.length,
      });
    },
    [query, schoolDetail, user]
  );

  React.useEffect(() => {
    const { comentarios } = detail;

    const aproved = (_aproved: boolean, author_id: string) => {
      if (!!user && author_id === user.id) return true;
      return _aproved;
    };

    const commentFiltered = comentarios
      .map((el) => {
        const _aproveThisComment = aproved(el.aproved, el.author_id);
        if (!_aproveThisComment) return null;
        const replyed = el.replyed
          .filter((rep) => aproved(rep.aproved, rep.author_id))
          .map((ab) => ({
            ...ab,
            created_date: new Date(ab.created_date),
          }));

        return {
          ...el,
          replyed: replyed,
          created_date: new Date(el.created_date),
        };
      })
      .filter((el) => !!el);

    const bodyNewSchool: ISchoolProps = {
      ...detail,
      comentarios: commentFiltered
    }

    setScholDetail(bodyNewSchool);

    setLoading(false);
  }, [detail, user]);


  return (
    <>
      <EvaluationMode isOpen={isOpen} onClose={_onClose} />
      <Container
        activeMenu={Menus.Escolas}
        extraContainer={<BannerSchool />}
        loading={loading}
      >
        <Divider mt={4} />
        <Flex mt={4} w="full">
          <Tabs w="full" colorScheme="orange">
            <Flex
              flexDir="row"
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <TabList>
                <Tab>Reputação</Tab>
                {/* <Tab>Sobre</Tab>
                <Tab>Conteúdo</Tab> */}
                <Tab>Localização</Tab>
                <Tab>Comentários</Tab>
              </TabList>
            </Flex>
            <Flex flex="1" w="full">
              <TabPanels w="full">
                <TabPanel>
                  <TabReputacao reputacao={schoolDetail.reputacao} />
                </TabPanel>
                {/* <TabPanel>
                  <Flex w="full" bg="red">
                    asdf
                  </Flex>
                </TabPanel> */}
                {/* <TabPanel>
                  <Conteudo />
                </TabPanel> */}
                <TabPanel>
                  <Localizacao localizacao={schoolDetail.localizacao} />
                </TabPanel>
                <TabPanel>
                  <Comentarios
                    onComentEnter={_onComentEnter}
                    onComentReplyedEnter={_onComentReplyedEnter}
                    comentarios={schoolDetail.comentarios}
                    addDislike={addDislike}
                    addLike={addLike}
                  />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Tabs>
        </Flex>
        {/* <Box>{schoolDetail.cidade}</Box> */}
      </Container>
    </>
  );
};

export default RankingDetail;