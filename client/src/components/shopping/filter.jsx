import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

function ProductFilter({filters, handleFilter}) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-md font-bold">Filters</h2>
          </div>
          <div className="p-4 space-y-4">
            {Object.keys(filterOptions).map((keyItem) => (
              <Fragment>
                <div>
                  <div className="grid gap-2 mt-2">
                    {filterOptions[keyItem].map((option) => (
                      <Label className="flex font-medium items-center gap-2 ">
                        <Checkbox className="bg-transparent" checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      } onCheckedChange={() => handleFilter(keyItem, option.id)}/>
                          {option.label}
                      </Label>
                    ))}
                  </div>
                </div>
                <Separator/>
              </Fragment>
            ))}
          </div>
        </div>
      );
}

export default ProductFilter;