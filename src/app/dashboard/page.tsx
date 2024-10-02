import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  return (
    <div className="flex flex-col justify-center my-16 gap-5 max-w-5xl mx-auto ">
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold">Dashboard </h1>

        <Dialog>
          <Button>
            <DialogTrigger>Create Invoice</DialogTrigger>
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5">Isn't that Easy ??</DialogTitle>
              <DialogDescription>
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="name" className="">
                      Billing Label
                    </Label>
                    <Input id="name" name="name" type="text" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="email" className="mb-2">
                      Billing Email
                    </Label>
                    <Input id="email" name="email" type="email" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="value" className="mb-2">
                      Value
                    </Label>
                    <Input id="value" name="value" type="text" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="description" className="mb-2">
                      Description
                    </Label>
                    <Textarea id="description" name="description" />
                  </div>

                  <div>
                    <Button  className="w-full">Submit</Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <p className="text-gray-500">Your invoices are listed here !!</p>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left">10/31/2024</TableCell>
            <TableCell className=" text-left">John Doe</TableCell>
            <TableCell className=" text-left">paid@wili.com</TableCell>
            <TableCell className=" text-center">
              <Badge>Open</Badge>
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">10/31/2024</TableCell>
            <TableCell className=" text-left">John Doe</TableCell>
            <TableCell className=" text-left">paid@wili.com</TableCell>
            <TableCell className=" text-center">
              <Badge>Open</Badge>
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
