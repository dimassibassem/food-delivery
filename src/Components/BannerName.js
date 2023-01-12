import React from "react";

function BannerName({ name, discount, more }) {
  const currency = "Dt";
  return (
    <div className="bannerContent">
      <h3>Hello {name},</h3>
      <p>
        Get free discount for every <span>{`${discount}${currency}`}</span>{" "}
        purchase
      </p>
      <a href={more}>Learn More</a>
    </div>
  );
}

export default BannerName;
