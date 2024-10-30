import { Link } from "react-router-dom";


const CartCard = () => {
  return (
    <div>
      <div className="w-[125px] h-[48px] mt-[41px] mb-[34px] relative left-[16px] dtcs:left-[124px] dtdf:left-[184px]">
        <h2 className="font-Poppins not-italic font-[700] text-[32px] text-[#222222]">
          My cart
        </h2>
      </div>
      {/* Wrap 2 Cartdisplay */}
      <div className="flex flex-col dtcs:flex-row justify-center gap-[40px] items-center dtcs:items-start content-center">
        {/* Cartdisplay     */}
        <div className="bg-[#ffffff] flex flex-col w-[343px] dtcs:w-[712px] dtdf:w-[944px] h-[603px] dtcs:h-[725px] dtdf:h-[838px] gap-[24px] items-center content-center bg ">
          {/* Itembox */}
          <div className="w-[311px] dtcs:w-[664px] dtdf:w-[896px] h-[32px] mt-[16px] ">
            <p className="font-Poppins not-italic font-[700] text-[24px] text-[#222222]">
              Items
            </p>
          </div>
          {/* Cartdisplay */}
          <div className="w-[311px] dtcs:w-[664px] h-[515px] dtcs:h-[621px] flex flex-col items-center gap-[24px]">
            {/* Picture display */}
            <div className="w-[261px] dtcs:w-[403px] h-[261px] dtcs:h-[403px] bg-[url('/src/img/emptyCart.png')] bg-cover bg-center"></div>
            {/* Text display */}
            <div className="w-[311px] h-[152px] gap-[8px] flex flex-col items-center">
              {/* Head text */}
              <div className="w-[311px] dtcs:w-[385px] h-[48px] dtcs:h-[60px]">
                <p className="font-bold font-Poppins text-[32px] dtcs:text-[40px] not-italic text-center text-[#222222] ">
                  Your cart is empty
                </p>
              </div>
              {/* detail text */}
              <div className="w-[311px] dtcs:w-[664px] h-[96px] dtcs:h-[48px]">
                <p className="font-semibold font-Poppins text-[18px] not-italic leadong-[24px] text-center text-[#222222]">
                  Looks like you have not added anything to your cart.
                  <br />
                  Go ahead & explore top categories.
                </p>
              </div>
            </div>
            {/* continue shopping button */}
            <div className="flex items-center justify-center w-[173px] h-[54px] py-[7px] px-[10px] bg-[#222222]">
              <button className="w-[153px] font-Poppins h-[20px] font-[400] text-[16px] text-center inline-block text-[#FFFFFF]  transform transition-transform duration-200 hover:scale-105">
                <Link to="/">Continue shopping</Link>
              </button>
            </div>
          </div>
        </div>
        {/* Summary Display */}
        <div className="bg-[#ffffff] w-[343px] dtcs:w-[440px] dtdf:w-[616px] flex flex-col items-center ">
          {/* Summary group + button */}
          <div className="w-[295px] dtcs:w-[392px] dtdf:w-[568px] flex flex-col item-center justify-center gap-[40px]">
            {/* Summary group */}
            <div className="flex flex-col gap-[24px]">
              {/* Summary box*/}
              <div className="w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[32px] mt-[24px] flex flex-row justify-between items-center">
                {/* Summary text */}
                <div className="w-[124px] h-[32px]">
                  <p className="font-Poppins font-bold text-[24px] text-[#222222]">
                    Summary
                  </p>
                </div>
                {/* Summary unit */}
                <div className="h-[24px] w-auto ">
                  <p className="font-Poppins font-[600] text-[18px] text-[#626262]">
                    0 items
                  </p>
                </div>
              </div>
              {/* Item box */}
              <div className="w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[20px] flex flex-row justify-between items-center">
                {/* Item text */}
                <div className="w-[62px] h-[20px]">
                  <p className="font-Poppins font-[400] text-[16px] text-[#9F9F9F]">
                    No item
                  </p>
                </div>
                {/* Item cost */}
                <div className="h-[20px]">
                  <p className="font-Poppins font-[400] text-[16px] text-[#9F9F9F]">
                    0.00
                  </p>
                </div>
              </div>
              <hr className="h-[auto] text-[#E1E1E1]" />
              {/* Subtotal + Shiping fee */}
              <div className="flex flex-col gap-[16px]">
                {/* Subtotal */}
                <div className="w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[20px] flex flex-row justify-between items-center">
                  {/* Subtotal text */}
                  <div className="w-[68px] h-[20px]">
                    <p className="font-Poppins font-[400] text-[16px] text-[#9F9F9F]">
                      Subtotal
                    </p>
                  </div>
                  {/* Subtotal Cost */}
                  <div className="h-[20px]">
                    <p className="font-Poppins font-[400] text-[16px] text-[#9F9F9F]">
                      0.00
                    </p>
                  </div>
                </div>
                {/* Shipping fee */}
                <div className="w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[20px] flex flex-row justify-between items-center">
                  {/* Shipping fee text */}
                  <div className="w-[100px] h-[20px]">
                    <p className="font-Poppins font-[400] text-[16px] text-[#9F9F9F]">
                      Shipping fee
                    </p>
                  </div>
                  {/* Shipping fee Cost */}
                  <div className="h-[20px]">
                    <p className="font-Poppins font-[400] text-[16px] text-[#9F9F9F]">
                      0.00
                    </p>
                  </div>
                </div>
              </div>
              <hr className="h-[auto] text-[#E1E1E1]" />
              {/* Total Group */}
              <div className="w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[20px] flex flex-row justify-between items-center">
                {/* Total text */}
                <div className="w-[100px]">
                  <p className="font-Poppins font-semibold text-[24px] text-[#9F9F9F]">
                    Total
                  </p>
                </div>
                {/* Total Cost */}
                <div>
                  <p className="font-Poppins font-[400] text-[16px] text-[#9F9F9F]">
                    0.00
                  </p>
                </div>
              </div>
            </div>
            {/* Button box */}
            <div className="flex flex-col items-center mt-[16px] mb-[16px] justify-center w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[124px] gap-[12px]">
              {/* Checkout button */}
              <div className="flex items-center justify-center w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[54px] py-[7px] px-[10px] bg-[#E1E1E1]">
                <p className="w-[82px] h-[20px] font-poppin font-[400] text-[16px] text-center inline-block text-[#9F9F9F] transform transition-transform duration-200 hover:scale-105">
                  Check out
                </p>
              </div>
              {/* Continue Shopping button */}
              <div className="flex items-center justify-center w-[295px] dtcs:w-[392px] dtdf:w-[568px] h-[54px] py-[7px] px-[10px] bg-[#FFFFFF] border border-[#E1E1E1] border-solid">
                <p className="w-[153px] h-[20px] font-[400] font-poppin text-[16px] text-center inline-block text-[#9F9F9F] transform transition-transform duration-200 hover:scale-105">
                  <Link href="#">Continue shopping</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
