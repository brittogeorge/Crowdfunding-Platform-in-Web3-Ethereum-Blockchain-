import React from "react";

const CampaignDetails = ({ campaign }) => {
  return (
    <div className="donations-container">
      {/* Campaign Header */}
      <h2 className="text-2xl font-bold mb-5">Donations for {campaign.title}</h2>
      
      {/* Donations Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Donor Address</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {campaign.donations?.length > 0 ? (
              campaign.donations.map((donation, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 text-blue-500">
                    <a
                      href={`https://etherscan.io/address/${donation.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {donation.address}
                    </a>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(donation.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                  No donations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignDetails;
