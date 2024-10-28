const CollectionCard = () => {
  return (
    <div className="dtcs:h-[462px] dtdf:h-[500px] w-full flex flex-col dtcs:flex-row gap-[20px] dtcs:gap-[40px] items-center  justify-center top-[254px] dtcs:top-[577px] ">
      {/* Season 2024 Card */}
      <div className="flex flex-col w-[343px] dtcs:w-[363px] h-[442px] dtcs:h-[462px] dtdf:h-[458px] gap-[20px] dtcs:gap-[24px] mb-[4px] ">
        <div className="flex flex-col w-[209px] h-[142px] dtcs:w-[251px] dtcs:h-[178px]">
          <div className="dtcs:h-[116px] dtcs:w-[238px] font-Poppins not-italic font-bold text-[64px] dtcs:text-[96px] text-[#222222] flex-none order-none flex-grow-0 ">
            2024
          </div>

          <div className="w-[209px] h-[60px] font-Poppins not-italic font-bold text-[40px] dtcs:text-[48px] text-[#222222] flex-none order-1 flex-grow-0">
            Collection
          </div>
        </div>
        <div className="w-[340px] h-[280px] dtcs:w-[363px] dtcs:h-[260px] flex-none order-none flex-grow-0">
          <p className="font-Poppins not-italic font-normal text-base leading-[20px] [#222222] flex-none order-1 flex-grow-0">
            Step into a world of winter elegance and style with our latest
            Winter Collection. As temperatures drop, our curated selection of
            clothing is designed to keep you fashionably warm. From luxurious
            knitwear to trend-setting outerwear, each piece in our collection is
            a celebration of seasonal sophistication. Explore the blend of
            comfort and fashion, as we present you with the must-have ensembles
            to make a statement in the chilly months ahead. Welcome to a winter
            wardrobe that seamlessly combines coziness with chic aesthetics.
          </p>
        </div>
      </div>
      {/* Wrap 2 Card */}
      <div className="flex flex-col dtcs:flex-row gap-[16px] relative dtcs:gap-[24px] dtcs:h-[462px] dtdf:h-[500px] ">
        {/* Cozy Breeze Card */}
        <div className="w-[343px] h-[500px] dtcs:w-[382.5px] dtcs:h-full dtdf:w-[575px] relative bg-[url('/src/img/collection1.jpg')] bg-cover bg-center ">
          {/* Gradient Overlay */}
          <div className="h-[350px] absolute top-[150px] inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] from-65% to-transparent dtcs:h-[277.2px] dtcs:top-[184.8px] dtcs:from-[rgba(0,0,0,0.8)] dtcs:from-0% dtcs:to-transparent dtdf:h-[300px] dtdf:top-[200px] dtdf:from-[rgba(0,0,0,0.8)] dtdf:from-0% dtdf:to-transparent "></div>
          {/* Content container */}
          <div className="absolute inset-0 flex flex-col items-center justify-end h-full ">
            <div className="w-[311px] h-[32px] flex item-center justify-center m-[8px]">
              <h2 className="text-[24px] font-bold text-[#FFFFFF]">
                Cozy Breeze
              </h2>
            </div>

            <div className="w-[311px] dtcs:w-[350.5px] dtdf:w-[543px] h-[140px] dtcs:h-[120px] dtdf:h-[80px] flex item-center justify-center m-[8px]">
              <p className="text-[16px] leading-[20px] font-[400px] text-[#FFFFFF] text-center">
                Embrace the season with our carefully curated selection of
                garments, each piece thoughtfully designed to blend fashion and
                functionality. From cozy knits to elegant outerwear, our
                collection invites you to indulge in the allure of winter
                fashion.
              </p>
            </div>

            <div className="flex items-center justify-center w-[105px] h-[54px] py-[7px] px-[10px] m-[8px] mb-[16px] bg-[#222222] dtcs:mb-[18px] ">
              <button className="w-[85px] dtcs:w-[105px] h-[20] dtcs:[54px] inline-block text-[#FFFFFF]  transform transition-transform duration-200 hover:scale-105">
                View more
              </button>
            </div>
          </div>
        </div>

        {/* Flexi Move Card */}
        <div className="w-[343px] h-[500px] dtcs:w-[382.5px] dtcs:h-full dtdf:w-[575px] relative bg-[url('/src/img/collection2.jpg')] bg-cover bg-center">
          {/* Gradient Overlay */}
          <div className="h-[350px] absolute top-[150px] inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] from-65% to-transparent dtcs:h-[277.2px] dtcs:top-[184.8px] dtcs:from-[rgba(0,0,0,0.8)] dtcs:from-0% dtcs:to-transparent dtdf:h-[300px] dtdf:top-[200px] dtdf:from-[rgba(0,0,0,0.8)] dtdf:from-0% dtdf:to-transparent "></div>
          {/* Content container */}
          <div className="absolute inset-0 flex flex-col items-center justify-end h-full ">
            <div className="w-[311px] h-[32px] flex item-center justify-center m-[8px]">
              <h2 className="text-[24px] font-bold text-[#FFFFFF]">
                Flexi Move
              </h2>
            </div>

            <div className="w-[311px] dtcs:w-[350.5px] dtdf:w-[543px] h-[140px] dtcs:h-[120px] dtdf:h-[80px] flex item-center justify-center m-[8px]">
              <p className="text-[16px] leading-[20px] font-[400px] text-[#FFFFFF] text-center">
                Step into a world where fashion meets functionality with our
                latest Sneaker Collection. Designed for those who appreciate the
                perfect fusion of style and comfort, our curated selection of
                sneakers is a celebration of urban chic.
              </p>
            </div>

            <div className="flex items-center justify-center w-[105px] h-[54px] py-[7px] px-[10px] m-[8px] mb-[16px] bg-[#222222] dtcs:mb-[18px] ">
              <button className="w-[85px] dtcs:w-[105px] h-[20] dtcs:[54px] inline-block text-[#FFFFFF]  transform transition-transform duration-200 hover:scale-105">
                View more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
