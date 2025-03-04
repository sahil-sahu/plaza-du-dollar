import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const DetailedInfo = () =>{
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
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel neque vel arcu faucibus sagittis. Sed vel turpis quis justo semper laoreet. Nulla facilisi. Donec euismod, mauris vel consectetur lobortis, mauris nunc dictum ipsum, in gravida velit velit et dolor.
                </p>
            </TabsContent>
            <TabsContent value="Additional">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel neque vel arcu faucibus sagittis. Sed vel turpis quis justo semper laoreet. Nulla facilisi. Donec euismod, mauris vel consectetur lobortis, mauris nunc dictum ipsum, in gravida velit velit et dolor.
                </p>
            </TabsContent>
            <TabsContent value="Specification">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel neque vel arcu faucibus sagittis. Sed vel turpis quis justo semper laoreet. Nulla facilisi. Donec euismod, mauris vel consectetur lobortis, mauris nunc dictum ipsum, in gravida velit velit et dolor.
                </p>
            </TabsContent>
            <TabsContent value="Review">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel neque vel arcu faucibus sagittis. Sed vel turpis quis justo semper laoreet. Nulla facilisi. Donec euismod, mauris vel consectetur lobortis, mauris nunc dictum ipsum, in gravida velit velit et dolor.
                </p>
            </TabsContent>
            </div>
        </Tabs>
    )
}

export default DetailedInfo;