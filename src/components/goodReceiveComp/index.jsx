import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const artitel = [
  {
    value: "9780198601838",
    label: "Next.js",
  },
  {
    value: "780198601838",
    label: "SvelteKit",
  },
];
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GoodReceiveComp = () => {
  const [isEnabled, setEnabled] = useState(false);
  const [caseIdValue, setCaseIdValue] = useState(""); // State for case id input
  const [qrMessage, setQrMessage] = useState("");
  const [scanError, setScanError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    let html5QrCode;
    const config = { fps: 30, qrbox: { width: 400, height: 150 } };

    const startScanner = () => {
      html5QrCode = new Html5Qrcode("qrCodeContainer");
      html5QrCode.start(
        {
          facingMode: "environment",
        },
        config,
        qrCodeSuccess,
        qrCodeError
      );
    };

    const stopScanner = () => {
      if (html5QrCode) {
        html5QrCode
          .stop()
          .then(() => {
            console.log("Scanner stopped");
          })
          .catch((err) => {
            console.error("Error stopping scanner", err);
          });
      }
    };

    const qrCodeSuccess = (decodeText) => {
      setQrMessage(decodeText);
      setEnabled(false);
      // Update case id input value when QR code is scanned successfully
      setCaseIdValue(decodeText);
      // Set the value in combobox when QR code is scanned successfully
      setValue(decodeText);
    };

    const qrCodeError = (err) => {
      console.error("QR code scan error", err);
      setScanError("Error scanning QR code");
    };

    if (isEnabled) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isEnabled]);

  const toggleScanner = () => {
    setQrMessage("");
    setScanError("");
    setEnabled(!isEnabled);
  };

  const handleInputChange = (event) => {
    setCaseIdValue(event.target.value);
  };
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <CardContent className="grid gap-4 rounded-lg border border-dashed shadow-sm ">
        <div className="scanner">
          <div id="qrCodeContainer"></div>
        </div>

        <div className="gap-2 pt-4">
          <Label htmlFor="case-id">Artikel</Label>
          <div className="grid grid-cols-9 mt-2">
            <div className="col-span-6 md:col-span-8">
              <Popover open={open} onOpenChange={setOpen} className="w-full">
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? artitel.find((art) => art.value === value)?.label
                      : "Select artikel..."}
                    <CaretSortIcon className="ml-2 h-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search art..." className="h-9" />
                    <CommandEmpty>No art found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {artitel.map((art) => (
                          <CommandItem
                            key={art.value}
                            value={art.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                              setCaseIdValue(currentValue);
                            }}
                          >
                            {art.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4",
                                value === art.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="col-span-3 md:col-span-1 ml-2">
              <Button onClick={toggleScanner} className="w-full">
                {isEnabled ? <div className="">Stop</div> : "Start"}{" "}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Deskripsi">Deskripsi</Label>
          <Input
            className="bg-slate-200"
            id="Deskripsi"
            type="text"
            disabled
            placeholder="Artikel Akan Muncul disini"
          />
        </div>
        <div className="grid grid-cols-9 gap-2">
          <div className="col-span-6 md:col-span-7 lg:col-span-8">
            <Label htmlFor="SO">Nomor SO</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <Label htmlFor="Issue-qty ">Issue Qty</Label>
            <Input
              id="Issue-qty"
              type="text"
              className="bg-slate-200"
              disabled
              placeholder="Issue Qty "
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <Label htmlFor="good-qty">Good Qty</Label>
            <Input id="good-qty" type="number" />
          </div>
          <div className="col-span-1">
            <Label htmlFor="bad-qty">bad Qty</Label>
            <Input id="bad-qty" type="number" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="remark">Remark</Label>
          <Textarea placeholder="Type your message here." />
        </div>
        <div className="flex justify-end mt-4">
          <Button className="w-full sm:w-1/4 md:w-1/5">Submit</Button>
        </div>
      </CardContent>{" "}
    </>
  );
};

export default GoodReceiveComp;
