import { Product } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DetailedInfoProps {
  product: Product;
}

const DetailedInfo = ({ product }: DetailedInfoProps) => {
  return (
    <Tabs className="border-2 border-gray-400" defaultValue="Description">
      <TabsList className="uppercase bg-white w-full text-center rounded-none pt-4 pb-[.7rem] border-b-2 border-gray-400">
        <TabsTrigger className="rounded-none data-[state=active]:border-b-my_green data-[state=active]:border-b-[3px] shadow-none" value="Description">
          <span>Description</span>
        </TabsTrigger>
        <TabsTrigger className="rounded-none data-[state=active]:border-b-my_green data-[state=active]:border-b-[3px] shadow-none" value="Additional">
          <span>Additional</span>
        </TabsTrigger>
        <TabsTrigger className="rounded-none data-[state=active]:border-b-my_green data-[state=active]:border-b-[3px] shadow-none" value="Specification">
          <span>Specification</span>
        </TabsTrigger>
        <TabsTrigger className="rounded-none data-[state=active]:border-b-my_green data-[state=active]:border-b-[3px] shadow-none" value="Review">
          <span>Review</span>
        </TabsTrigger>
      </TabsList>
      <div className="p-6">
        <TabsContent value="Description">
          <p>{product.description || "No description available."}</p>
        </TabsContent>
        <TabsContent value="Additional">
          <p>{product.additional || "No additional information available."}</p>
        </TabsContent>
        <TabsContent value="Specification">
          <p>{product.specification || "No specification available."}</p>
        </TabsContent>
        <TabsContent value="Review">
          <p>Reviews coming soon.</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DetailedInfo;