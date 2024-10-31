import { X } from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import formatPrice from "@/utils/formatPrice";
import { Link } from "react-router-dom";
import { useCart } from "./appCartLogic";

const CartNotificationCard = ({
  isOpen,
  onClose,
  name,
  imageUrls,
  quantity,
  price,
}) => {
  const { cartId } = useCart();

  if (!isOpen) return null;

  const selectedImage = imageUrls[0];

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-start justify-center">
      <Card className="w-full max-w-[70%] h-auto max-h-[90vh] mt-20 border rounded-lg overflow-hidden lg:max-w-[900px] lg:max-h-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sm:py-6 lg:py-4 lg:flex-row">
          <h2 className="text-lg font-bold">Items added to your cart</h2>
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

        {/* Content */}
        <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row lg:gap-4 lg:items-center">
          <div className="flex justify-center items-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-muted rounded-md overflow-hidden">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="p-4 flex-1">
            <div className="flex flex-row justify-between items-start lg:items-center">
              <h3 className="text-lg sm:text-xl font-bold">{name}</h3>
              <p className="text-lg font-bold md:translate-y-0 sm:text-xl translate-y-11 mt-0">
                THB {formatPrice(quantity * price)}
              </p>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground mt-2 text-[#626262]">
              QTY: {quantity}
            </p>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col sm:flex-row w-full gap-2 p-4 sm:pt-2 lg:pt-4">
          <Link to={`/carts/${cartId}`} className="w-full sm:w-auto sm:flex-1">
            <Button
              onClick={onClose}
              className="w-full bg-[#222222] hover:bg-[#333333] text-white"
            >
              View cart
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full sm:w-auto sm:flex-1"
            onClick={onClose}
          >
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
  price: PropTypes.number.isRequired,
};

export default CartNotificationCard;
