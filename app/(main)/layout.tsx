import LeftSideBar from "../components/ui/LeftSideBar";
import Wrapper from "../components/ui/Wrapper";
import Container from "../components/ui/Container";
import "@/app/globals.css";
interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <Wrapper>
      <Container className="flex ">
        <LeftSideBar />
        <main className="flex-1">{children}</main>
      </Container>
    </Wrapper>
  );
}
