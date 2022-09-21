import {
    extendTheme
} from "@chakra-ui/react";


const theme = extendTheme({
    colors: {
        "_orange": {
            100: "#FF6736",
            200: "#FC6433",
            300: "#F55B29",
            400: "#EC4E1C",
            500: "#E34715",
            600: "#E33A15",
            700: "#DD3E1C",
            800: "#D63F1E",
            900: "#F35724"
        },
        "_blue": "#009ABC",
        "_dark_blue": "#0A709B",
        "_green": "#00CF9A",
        "_purple": "#874A9F",
        "_red": "#993950",
        "_default_bg": "#F5FCFF"
    },
    fonts: {
        body: "Inter, Roboto, sans-serif",
        heading: "Inter, Roboto, sans-serif",
        mono: "Roboto, sans-serif",
    }
})

export default theme;