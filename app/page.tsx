import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="Yummy Pizza" size="lg" className="font-extrabold"/>
      </Container>
      <TopBar/>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters/>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title={''} products={[{
                id:1,
                name:"test",
                imageUrl:"",
                price:50,
                items:[{price:50}]
              }]} categoryId={0} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
