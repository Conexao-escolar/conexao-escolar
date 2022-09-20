import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Img from "next/image";

const SliceTesteAgoraVai = ({ slice }) => {
  console.log(slice);
  return (
    <section>
      <span className="title">
        {slice.primary.title ? (
          <PrismicRichText field={slice.primary.title} />
        ) : (
          <h2>Template slice, update me!</h2>
        )}
      </span>
      <PrismicNextImage
        height="300px"
        width="300px"
        src={slice.primary.bannerimg.url}
        alt={slice.primary.bannerimg.alt}
      />

      {slice.primary.description ? (
        <PrismicRichText field={slice.primary.description} />
      ) : (
        <p>start by editing this slice from inside Slice Machine!</p>
      )}

      <style jsx>{`
        section {
          max-width: 600px;
          margin: 4em auto;
          text-align: center;
        }
        .title {
          color: #8592e0;
        }
      `}</style>
    </section>
  );
};

export default SliceTesteAgoraVai;
