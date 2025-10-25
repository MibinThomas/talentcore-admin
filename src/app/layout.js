import LayoutWrapper from "./LayoutWrapper";
import PropTypes from "prop-types";
import "@/styles/globals.css";

export const metadata = {
  title: "Talentcore",
  description:
    "A web-based Employee-Employer Platform MVP designed to help candidates connect, apply, and grow their careers.",
  authors: [{ name: "Webeyecraft Technologies Pvt. Ltd" }],
  publisher: "Talentcore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
          <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
