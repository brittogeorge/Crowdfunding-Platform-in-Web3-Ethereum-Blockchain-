import React from "react";

const Card = ({ title, allcampaign, daysLeft, setDonate, setOpenModel }) => {
  return (
    <div className="car">
      <div className="py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        {/* Title Section */}
        <p className="py-16 text-2xl font-bold leading-5">{title}</p>

        {/* Campaign Grid */}
        <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {allcampaign?.map((campaign, i) => (
            <div
              onClick={() => {
                setDonate(campaign);
                setOpenModel(true);
              }}
              className=" bor cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
            >
              {/* Campaign Image */}
              <img
                src="https://capitalcampaignpro.com/wp-content/uploads/2021/02/campaigns-good-for-fundraising.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
                className="object-cover w-full h-64 rounded"
                alt={`Campaign Image: ${campaign.title}`}
              />

              {/* Campaign Details */}
              <div className="py-5 pl-2">
                <p className="mb-2 text-xs font-semibold text-gray-600 uppercase"></p>

                {/* Campaign Title */}
                <a
                  href="/"
                  aria-label="Article"
                  className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  <p className=" col text-2xl font-bold leading-5">
                    {campaign.title}
                  </p>
                </a>

                {/* Campaign Description */}
                <p className="col mb-4 text-gray-700">{campaign.description}</p>

                {/* Campaign Financial Details */}
                <div className=" col flex space-x-4">
                  <p className="font-semibold">Price: {campaign.target} ETH</p>
                  <p className="font-semibold">
                    Amount Collected: {campaign.amountCollected} ETH
                  </p>
                </div>

                {/* Campaign Owner */}
                <div className=" col flex items-center mt-[20px] gap-[12px]">
                  <p>
                    Created By: <span>{campaign.owner}</span>
                  </p>
                </div>
                {/* Donors Section */}
                <div className="mt-5">
                  <p className=" col text-lg font-bold">Donors:</p>
                  <ul className="mt-2 space-y-2">
                    {campaign.donors?.length > 0 ? (
                      campaign.donors.map((donor, index) => (
                        <li key={index} className="text-gray-700">
                          <span className="font-semibold">Address:</span>{" "}
                          {donor.address}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500">No donors yet.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
