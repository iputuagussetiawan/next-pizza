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
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters/>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title={'Margherita'} products={[
                {
                  id:1,
                  name:"test",
                  imageUrl:"https://media.dodostatic.com/image/r:233x233/11EF398C6951C2328B1C4B0ABFCA99A7.avif",
                  price:50,
                  items:[{price:50}]
                },
                {
                  id:2,
                  name:"test",
                  imageUrl:"https://media.dodostatic.com/image/r:233x233/11EE8689A0D8A65D81FA681B15A5157A.avif",
                  price:50,
                  items:[{price:50}]
                },
                
                ]} categoryId={1} />

              <ProductsGroupList title={'Pepperoni'} products={[
                {
                  id:3,
                  name:"test",
                  imageUrl:"https://media.dodostatic.com/image/r:233x233/11EF398C6951C2328B1C4B0ABFCA99A7.avif",
                  price:50,
                  items:[{price:50}]
                },
                {
                  id:4,
                  name:"test",
                  imageUrl:"https://media.dodostatic.com/image/r:233x233/11EE8689A0D8A65D81FA681B15A5157A.avif",
                  price:50,
                  items:[{price:50}]
                },
                
                ]} categoryId={2} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
