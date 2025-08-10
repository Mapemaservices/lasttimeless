import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { CheckCircle, Copy, Phone, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderConfirmationProps {
  orderNumber: string;
  onBackToShopping: () => void;
}

export function OrderConfirmation({ orderNumber, onBackToShopping }: OrderConfirmationProps) {
  const { data: settings } = useWebsiteSettings();
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const copyOrderDetails = () => {
    const orderDetails = `Order: ${orderNumber}\nPaybill: ${settings?.mpesa_paybill || '522522'}\nAccount: ${settings?.mpesa_account || '1342330668'}`;
    navigator.clipboard.writeText(orderDetails);
    toast({
      title: "Copied!",
      description: "Order details copied to clipboard",
    });
  };

  const sendWhatsAppMessage = () => {
    const phoneNumber = settings?.contact_phone?.replace(/\D/g, '') || '254768174878';
    const message = encodeURIComponent(`Hi! I have placed order ${orderNumber} and completed MPESA payment. Please confirm receipt.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="text-center">
        <CardContent className="pt-8 pb-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-muted-foreground mb-4">
            Your order has been created and we've received your transaction code. We'll verify your payment shortly.
          </p>
          <Badge variant="outline" className="text-lg py-2 px-4">
            Order #{orderNumber}
          </Badge>
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Payment Received</span>
            <Badge className="bg-green-500">Transaction Code Submitted</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-800">✓ Transaction Code Received!</h4>
            <p className="text-sm text-green-700">
              We've received your MPESA transaction code and will verify your payment within 1-2 hours. 
              You'll receive an SMS confirmation once your payment is verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Paybill Used</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{settings?.mpesa_paybill || '522522'}</span>
              </div>
            </div>

            <div className="bg-secondary/5 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Account Used</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{settings?.mpesa_account || '1342330668'}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={copyOrderDetails} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy Order Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">1</div>
            <div>
              <div className="font-medium">✓ Payment Code Submitted</div>
              <div className="text-sm text-muted-foreground">Your MPESA transaction code has been received</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-muted-foreground text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">2</div>
            <div>
              <div className="font-medium">Payment Verification</div>
              <div className="text-sm text-muted-foreground">We'll verify your payment within 1-2 hours</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-muted-foreground text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">3</div>
            <div>
              <div className="font-medium">Order Processing & Delivery</div>
              <div className="text-sm text-muted-foreground">Your order will be processed and delivered to your address</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              Need help? Contact us:
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = `tel:${settings?.contact_phone || '0768174878'}`}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = `mailto:${settings?.contact_email || 'timelessstrands@outlook.com'}`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </Button>
            </div>

            <Button onClick={onBackToShopping} className="w-full">
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}