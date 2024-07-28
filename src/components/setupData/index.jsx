import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const SetupData = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Setup Data</h1>
      </div>
      <CardContent className="grid pt-4 gap-4 rounded-lg border border-dashed shadow-sm ">
        <div className="container">
          <Input className="mb-4" type="file" />

          <div className="flex justify-end mt-4">
            <Button className=" md:w-1/5">Submit</Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default SetupData;
