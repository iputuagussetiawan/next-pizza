import { Container, Title, TopBar } from "@/components/shared";


export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="Yummy Pizza" size="lg" className="font-extrabold"/>
        <TopBar/>
        <div style={{ height:'1000px'}}></div>
      </Container>
    </>
  );
}
