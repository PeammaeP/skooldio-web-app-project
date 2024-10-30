import { X } from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import formatPrice from "@/utils/formatPrice";

const CartNotificationCard = ({
  isOpen,
  onClose,
  name,
  imageUrls,
  quantity,
  skuCode,
  price,
}) => {
  if (!isOpen) return null;

  const selectedImage = imageUrls[0];

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-start justify-center">
      <Card className="w-full max-w-[900px] h-full max-h-[374px] mt-20 border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Items added to your cart</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="w-40 h-40 bg-muted rounded-md overflow-hidden">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4 flex-1">
              <div className="flex flex-row justify-between items-end">
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="text-xl font-bold mt-1">
                  THB {formatPrice(quantity * price)}
                </p>
              </div>
              <p className="text-lg text-muted-foreground mt-3 text-[#626262]">
                QTY: {quantity}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row w-full h-1/3 gap-2 p-4 pt-2">
          <Button
            className="w-full bg-[#222222] hover:bg-[#333333] text-white"
            onClick={() => (window.location.href = "/cart")}
          >
            View cart
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Continue shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

CartNotificationCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  quantity: PropTypes.number.isRequired,
  skuCode: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CartNotificationCard;
