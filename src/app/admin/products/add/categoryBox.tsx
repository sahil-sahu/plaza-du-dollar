"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { databases } from "@/app/appwrite"
import { categoryObj } from "@/types"

export function CategoryBox({value, setValue}:{value:string; setValue:React.Dispatch<React.SetStateAction<string>>}) {
  const [open, setOpen] = React.useState(false)
  const [categories, setCategories] = React.useState<categoryObj[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await databases.listDocuments(
          "67b8c653002efe0cdbb2",
          "category"
        );
        setCategories(response.documents as categoryObj[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Button variant="outline" className="w-full justify-between" disabled>
        Loading categories...
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          id="category"
          className="w-full justify-between"
        >
          {value
            ? categories.find((category) => category.$id === value)?.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.$id}
                  value={category.$id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.$id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryBox
