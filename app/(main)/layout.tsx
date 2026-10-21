import LeftSideBar from "../components/ui/LeftSideBar";
import Wrapper from "../components/ui/Wrapper";
import Container from "../components/ui/Container";
import "@/app/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

interface Props {
  children: React.ReactNode;
}
export default function layout({ children }: Props) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Wrapper>
          <Container className="flex">
            <LeftSideBar />
            <main className="flex-1">{children}</main>
          </Container>
        </Wrapper>
      </body>
    </html>
  );
}
