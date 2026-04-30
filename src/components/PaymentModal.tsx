import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  hotelName: string;
  onPaymentComplete: (cardLast4: string, paymentMethod: string) => void;
}

const PaymentModal = ({ open, onOpenChange, total, hotelName, onPaymentComplete }: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete(last4, "Visa");
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setName("");
    }, 2000);
  };

  const isValid = cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length >= 3 && name.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-fredoka text-xl">
            <CreditCard className="h-5 w-5 text-primary" /> Payment Details
          </DialogTitle>
          <DialogDescription>
            Complete your booking for <strong>{hotelName}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl bg-gradient-to-r from-primary to-globe-coral p-4 text-primary-foreground">
            <p className="text-sm opacity-80">Total Amount</p>
            <p className="font-fredoka text-3xl font-bold">${total}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-name">Cardholder Name</Label>
            <Input
              id="card-name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="card-number"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <Lock className="h-4 w-4 flex-shrink-0" />
            <span>This is a simulated payment. No real charges will be made.</span>
          </div>

          <Button
            type="submit"
            disabled={!isValid || processing}
            className="w-full rounded-full bg-gradient-to-r from-primary to-globe-coral py-6 font-fredoka text-lg font-semibold"
          >
            {processing ? "Processing Payment..." : `Pay $${total}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
