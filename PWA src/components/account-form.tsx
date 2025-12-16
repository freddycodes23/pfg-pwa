
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, UserPlus, Send, Loader2, Upload, Edit, User, Package, Handshake, Users2, AtSign, Phone, Home, ShoppingCart, CalendarIcon, Banknote } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { generateReferralMessageAction } from '@/app/actions';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { useUser } from '@/firebase';

type Dependant = {
  id: number;
  name: string;
  relationship: string;
};

const initialDependants: Dependant[] = [
  { id: 1, name: "Sipho Molefi", relationship: "Spouse" },
  { id: 2, name: "Tiisetso Dani", relationship: "Child" },
];

export function AccountManagementForm() {
  const { toast } = useToast();
  const { user } = useUser();
  
  const [dependants, setDependants] = useState<Dependant[]>(initialDependants);
  const [newDependantName, setNewDependantName] = useState("");
  const [newDependantRelationship, setNewDependantRelationship] = useState("");
  const [newDependantIdNumber, setNewDependantIdNumber] = useState("");
  const [newDependantDob, setNewDependantDob] = useState("");
  
  const [hasGroceryBenefit, setHasGroceryBenefit] = useState(false);
  const [funeralPlan, setFuneralPlan] = useState("Khomakhwatsi: Lite Package");

  const [referralName, setReferralName] = useState('');
  const [referralPhone, setReferralPhone] = useState('');
  const [referralRelationship, setReferralRelationship] = useState<'Friend' | 'Relative'>('Friend');
  const [isSendingReferral, setIsSendingReferral] = useState(false);
  const [isChangeDetailsOpen, setIsChangeDetailsOpen] = useState(false);
  const [isManageDependantsOpen, setIsManageDependantsOpen] = useState(false);
  const [isDebitOrderOpen, setIsDebitOrderOpen] = useState(false);
  const [debitOrderDate, setDebitOrderDate] = useState<Date | undefined>(undefined);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRemoveDependant = (id: number) => {
    setDependants(dependants.filter((d) => d.id !== id));
    toast({
      title: "Dependant Removed",
      description: "The dependant has been successfully removed from your policy.",
    });
  };

  const handleAddDependant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDependantName && newDependantRelationship && newDependantIdNumber && newDependantDob) {
      const newDependant = {
        id: Date.now(),
        name: newDependantName,
        relationship: newDependantRelationship,
      };
      setDependants([...dependants, newDependant]);
      setNewDependantName("");
      setNewDependantRelationship("");
      setNewDependantIdNumber("");
      setNewDependantDob("");
      toast({
        title: "Dependant Added",
        description: `${newDependant.name} has been successfully added to your policy.`,
      });
    }
  };

  const toggleGroceryBenefit = (checked: boolean) => {
    setHasGroceryBenefit(checked);
    toast({
      title: `Grocery Benefit ${checked ? 'Added' : 'Removed'}`,
      description: `The Grocery Benefit has been successfully ${checked ? 'added to' : 'removed from'} your policy.`,
    });
  }
  
  const handlePlanChange = (value: string) => {
    setFuneralPlan(value);
    toast({
        title: "Plan Changed",
        description: `Your funeral plan has been updated to ${value}.`,
    });
  }

  const handleProfileSave = () => {
    toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
    });
    setIsChangeDetailsOpen(false);
  }
  
  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Document Selected",
        description: `${file.name} is ready for upload for ${name}.`,
      })
    }
  }

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralName || !referralPhone || !referralRelationship) {
        toast({
            title: "Missing Information",
            description: "Please fill out all fields for the referral.",
            variant: "destructive",
        });
        return;
    }

    setIsSendingReferral(true);
    try {
        const pwaLink = window.location.origin;
        const { message } = await generateReferralMessageAction({
            referrerName: user?.displayName || 'A friend',
            recipientName: referralName,
            relationship: referralRelationship,
            pwaLink: pwaLink,
        });

        const whatsappUrl = `https://wa.me/27${referralPhone.replace(/^0/, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        toast({
            title: "Referral Ready",
            description: "Your WhatsApp message is ready to be sent.",
        });

        setReferralName('');
        setReferralPhone('');
        setReferralRelationship('Friend');

    } catch (error: any) {
        toast({
            title: "Failed to Generate Message",
            description: error.message || "An unexpected error occurred.",
            variant: "destructive",
        });
    } finally {
        setIsSendingReferral(false);
    }
  };

  const handleDebitOrderSetup = () => {
    if (!debitOrderDate) {
      toast({
        title: 'Date not selected',
        description: 'Please select a date for the debit order.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: "Debit Order Setup Successful",
      description: `Your debit order has been scheduled for the ${format(debitOrderDate, 'do')} of each month.`,
    });
    setIsDebitOrderOpen(false);
  }

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  const DetailRow = ({ icon, label, value }: { icon: React.ElementType, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 border-b">
        <div className="flex items-center gap-3">
            <div className="bg-muted p-2 rounded-full">
                {React.createElement(icon, { className: "h-5 w-5 text-muted-foreground" })}
            </div>
            <span className="font-medium text-sm">{label}</span>
        </div>
        <span className="text-sm text-muted-foreground text-right">{value}</span>
    </div>
  );

  return (
    <div className="space-y-8 p-1">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 text-xl">
                  <AvatarFallback>{getInitials(user?.displayName || 'User')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user?.displayName || 'Valued Client'}</CardTitle>
                <CardDescription>
                    Welcome to your account management center.
                </CardDescription>
              </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <h3 className="font-semibold mb-4">Personal Details</h3>
            <DetailRow icon={User} label="Full Name" value={user?.displayName || 'N/A'} />
            <DetailRow icon={Users2} label="ID Number" value="9001015000080" />
            <DetailRow icon={AtSign} label="Email" value={user?.email || 'N/A'} />
            <DetailRow icon={Phone} label="Phone Number" value={user?.phoneNumber || '+27 72 123 4567'} />
            <DetailRow icon={Home} label="Physical Address" value="123 Sample Street, Pretoria, 0002" />
        </CardContent>
         <CardFooter className='flex-col items-start gap-4'>
            <Dialog open={isChangeDetailsOpen} onOpenChange={setIsChangeDetailsOpen}>
                <DialogTrigger asChild>
                    <Button><Edit className="mr-2 h-4 w-4" />Change Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[90vh] md:h-5/6 flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Change Your Details</DialogTitle>
                        <DialogDescription>Edit your personal information and policy settings here.</DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow min-h-0 overflow-y-auto pr-6 space-y-8">
                       <Card className="border-none shadow-none">
                            <CardHeader>
                                <CardTitle>Profile Details</CardTitle>
                                <CardDescription>Manage your personal information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarFallback>{getInitials(user?.displayName || "User")}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="main-id-upload" className={cn(buttonVariants({ variant: 'outline' }), 'cursor-pointer')}>
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload ID
                                        </Label>
                                        <Input id="main-id-upload" type="file" className="hidden" onChange={(e) => handleIdUpload(e, 'main account holder')} />
                                        <Label className="text-sm text-muted-foreground">PDF limit 2MB</Label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name-edit">Full Name</Label>
                                        <Input id="name-edit" defaultValue={user?.displayName || ''} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email-edit">Email (Optional)</Label>
                                        <Input id="email-edit" type="email" defaultValue={user?.email || ''} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone-edit">Phone Number</Label>
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-background text-sm text-muted-foreground">+27</span>
                                        <Input id="phone-edit" type="tel" placeholder="72 123 4567" defaultValue={user?.phoneNumber?.substring(3) || ''} className="rounded-l-none" />
                                    </div>
                                </div>
                                <Separator />
                                <ThemeSwitcher />
                                <Separator />
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                                    <Input id="confirm-new-password" type="password" />
                                </div>
                            </CardContent>
                        </Card>
                         <Card className="border-none shadow-none">
                            <CardHeader>
                                <CardTitle>Policy Management</CardTitle>
                                <CardDescription>Adjust your funeral plan and add-on benefits.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="funeral-plan">Funeral Plan</Label>
                                    <Select value={funeralPlan} onValueChange={handlePlanChange}>
                                        <SelectTrigger id="funeral-plan"><SelectValue placeholder="Select a plan" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Khomakhwatsi: Main Package">Khomakhwatsi: Main Package</SelectItem>
                                            <SelectItem value="Khomakhwatsi: Lite Package">Khomakhwatsi: Lite Package</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="grocery-benefit" className="text-base">Grocery Benefit</Label>
                                        <p className="text-sm text-muted-foreground">Add the monthly grocery benefit to your policy.</p>
                                    </div>
                                    <Switch id="grocery-benefit" checked={hasGroceryBenefit} onCheckedChange={toggleGroceryBenefit} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <DialogFooter className="pr-6">
                        <DialogClose asChild>
                             <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleProfileSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
            <CardDescription>An overview of your current policy and benefits.</CardDescription>
        </CardHeader>
        <CardContent>
            <DetailRow icon={Package} label="Funeral Plan" value={funeralPlan} />
            <DetailRow icon={ShoppingCart} label="Grocery Benefit" value={hasGroceryBenefit ? "Yes" : "No"} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Debit Order Setup</CardTitle>
          <CardDescription>Automate your monthly payments by setting up a debit order.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">You currently do not have an active debit order. Click the button below to set one up.</p>
        </CardContent>
        <CardFooter>
          <Dialog open={isDebitOrderOpen} onOpenChange={setIsDebitOrderOpen}>
            <DialogTrigger asChild>
              <Button>
                <Banknote className="mr-2 h-4 w-4" />
                Set Up Debit Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Debit Order Authorization</DialogTitle>
                <DialogDescription>Select a date and agree to the terms to set up your debit order.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="debit-date">Debit Order Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="debit-date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !debitOrderDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {debitOrderDate ? format(debitOrderDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={debitOrderDate}
                        onSelect={setDebitOrderDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Terms and Conditions</Label>
                  <ScrollArea className="h-32 w-full rounded-md border p-3">
                    <p className="text-xs text-muted-foreground">
                      I/We hereby authorize Pyramid Group Funerals to issue and deliver payment instructions to your Banker for collection against my/our abovementioned account at my/our above-mentioned Bank on condition that the sum of such payment instructions will not differ from my/our obligations as agreed to in the Agreement.
                      The individual payment instructions so authorized to be issued must be issued and delivered monthly on the date selected.
                      The payment instructions so authorized to be issued must carry a number, which must be included in the said payment instructions and if provided to me should enable me to identify the Agreement. This number must be added to this form before the issuing of any payment instruction. I agree that the first payment instruction will be issued on the date I have selected, and thereafter regularly according to the agreement.
                    </p>
                  </ScrollArea>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions.
                  </label>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button onClick={handleDebitOrderSetup} disabled={!termsAccepted}>
                  Confirm Setup
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>


      <Card>
        <CardHeader>
            <CardTitle>Dependant Management</CardTitle>
            <CardDescription>A list of dependants covered by your policy.</CardDescription>
        </CardHeader>
        <CardContent>
             {dependants.length > 0 ? (
                 dependants.map(d => <DetailRow key={d.id} icon={User} label={d.name} value={d.relationship} />)
             ) : (
                <p className="text-sm text-muted-foreground text-center py-4">You have no dependants on your policy.</p>
             )}
        </CardContent>
        <CardFooter>
            <Dialog open={isManageDependantsOpen} onOpenChange={setIsManageDependantsOpen}>
                <DialogTrigger asChild>
                    <Button><Edit className="mr-2 h-4 w-4" />Manage Dependants</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[90vh] md:h-5/6 flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Manage Your Dependants</DialogTitle>
                        <DialogDescription>Add, remove, or update dependant details here.</DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow min-h-0 overflow-y-auto pr-6 space-y-8">
                         <Card className="border-none shadow-none">
                            <CardHeader>
                                <h3 className="text-lg font-medium">Current Dependants</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                            {dependants.map((dependant) => (
                                <div key={dependant.id} className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="font-medium">{dependant.name}</p>
                                    <p className="text-sm text-muted-foreground">{dependant.relationship}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor={`dependant-id-upload-${dependant.id}`} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'cursor-pointer')}>
                                        <Upload className="h-4 w-4 mr-2"/>
                                        Upload ID
                                    </Label>
                                    <Input id={`dependant-id-upload-${dependant.id}`} type="file" className="hidden" onChange={(e) => handleIdUpload(e, dependant.name)} />
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveDependant(dependant.id)}>
                                        <Trash2 className="h-5 w-5 text-destructive" />
                                        <span className="sr-only">Remove Dependant</span>
                                    </Button>
                                </div>
                                </div>
                            ))}
                            {dependants.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">You have no dependants on your policy.</p>
                            )}
                            </CardContent>
                        </Card>
                        <Separator />
                        <Card className="border-none shadow-none">
                            <CardHeader>
                                <h3 className="text-lg font-medium">Add New Dependant</h3>
                            </CardHeader>
                            <form onSubmit={handleAddDependant}>
                               <CardContent className="space-y-4">
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-dependant-name">Full Name</Label>
                                            <Input id="new-dependant-name" placeholder="e.g. Mary Smith" value={newDependantName} onChange={(e) => setNewDependantName(e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-dependant-relationship">Relationship</Label>
                                            <Input id="new-dependant-relationship" placeholder="e.g. Daughter" value={newDependantRelationship} onChange={(e) => setNewDependantRelationship(e.target.value)} required />
                                        </div>
                                    </div>
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                           <Label htmlFor="new-dependant-id">ID Number</Label>
                                           <Input id="new-dependant-id" placeholder="e.g. 9001015000080" value={newDependantIdNumber} onChange={(e) => setNewDependantIdNumber(e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-dependant-dob">Date of Birth</Label>
                                            <Input id="new-dependant-dob" type="date" value={newDependantDob} onChange={(e) => setNewDependantDob(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dependant-id-upload-new">Upload Certified ID</Label>
                                        <Input id="dependant-id-upload-new" type="file" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                     <Button type="submit">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Add Dependant
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                     <DialogFooter className="pr-6">
                        <DialogClose asChild>
                             <Button type="button" variant="secondary">Done</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Refer a Friend or Relative</CardTitle>
            <CardDescription>Share the peace of mind with your loved ones via WhatsApp.</CardDescription>
        </CardHeader>
        <form onSubmit={handleReferralSubmit}>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="referral-name">Recipient's Name</Label>
                        <Input 
                            id="referral-name" 
                            placeholder="e.g. Jane Doe"
                            value={referralName}
                            onChange={(e) => setReferralName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="referral-phone">Recipient's WhatsApp Number</Label>
                         <div className="flex items-center">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-background text-sm text-muted-foreground">
                                +27
                            </span>
                            <Input
                                id="referral-phone"
                                type="tel"
                                placeholder="82 987 6543"
                                value={referralPhone}
                                onChange={(e) => setReferralPhone(e.target.value)}
                                required
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                  <Label>Relationship to You</Label>
                  <RadioGroup 
                    value={referralRelationship} 
                    onValueChange={(value: 'Friend' | 'Relative') => setReferralRelationship(value)} 
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Friend" id="friend" />
                      <Label htmlFor="friend">Friend</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Relative" id="relative" />
                      <Label htmlFor="relative">Relative</Label>
                    </div>
                  </RadioGroup>
                </div>
            </CardContent>
            <CardFooter>
                 <Button type="submit" disabled={isSendingReferral}>
                    {isSendingReferral ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="mr-2 h-4 w-4" />
                    )}
                    Send via WhatsApp
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
