"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BiSolidDownArrow,
  BiSolidDownArrowCircle,
  BiSolidDownArrowAlt,
  BiSolidUpArrow,
} from "react-icons/Bi";
import Timer from "./Timer";
import ParseFloat from "@/utils";

export default function HeroSection() {
  const [isgold, setIsGold] = useState(true);

  const toggleGold = () => {
    setIsGold(!isgold);
  };
  useEffect(() => {}, [isgold]);

  const handleImageClickPlayStore = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.brightdigigold.customer&pli=1",
      "_blank"
    );
  };

  const handleImageClickAppStore = () => {
    window.open(
      "https://apps.apple.com/in/app/bright-digi-gold-buy-24k-gold/id1640972173",
      "_blank"
    );
  };

  const [isInputClicked, setIsInputClicked] = useState(false);

  const [rupeesValue, setRupeesValue] = useState("");
  const [gramsValue, setGramsValue] = useState("");
  const handleInputClick = () => {
    setIsInputClicked(true);
  };

  const handleRupeesInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value: any = event.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      console.log("first====>", value);
      setRupeesValue(value);
      const grams = ParseFloat(((value / 103) * 100) / 5967.34, 4);
      console.log("grams====>", grams);
      setGramsValue(grams.toString()); // Adjust the number of decimal places as needed
    }
  };

  const handleGramsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value: any = event.target.value;
    if (/^\d*\.?\d{0,4}$/.test(value)) {
      setGramsValue(value);
      const goldrate = ParseFloat(0.03 * 5967.34 + 5967.34, 2);
      console.log("value", value);
      console.table({ value, goldrate });
      const rupees = ParseFloat(value * goldrate, 2);
      console.table({ value, goldrate, rupees });

      setRupeesValue(rupees.toString()); // Adjust the number of decimal places as needed
    }
  };

  return (
    <main className="background_color">
      <div className="container">
        <div className="flex">
          <div className="forMargin">
            <h1 className=" text__color">
              Invest Your Savings <br />
              Just a click away
            </h1>
            <div className="flex">
              <Image
                className="image__gold__bar"
                src="/gold-bars.svg"
                alt="gold-bars"
                height={55}
                width={55}
              />
              <div className="image_padding">
                <h3>
                  Invest or sell 24 karat Gold from the comfort of your home.
                </h3>
              </div>
            </div>

            <p className="text__color2">
              We at Bright DiGi Gold encourage users to participate in seamless
              Gold/Silver <br /> transactions through Digital Buying and
              Selling, with a minimum transaction <br /> value of Rs.10/-. The
              aim is to promote hassle-free Gold/Silver transactions.
            </p>
            <div className="flex">
              <h2 className="text__color3">Secured With</h2>
              {/* <Image
              src="/brinks-logo.webp "
              height={40}
              width={40}
              alt="brinks logo"
            ></Image> */}
              <p className="b1">|</p>
              <p className="b2">|</p>
              <p className="b3">|</p>
              <p className="b4">|</p>
              <p className="b">BRINKS</p>
            </div>

            <div className="flex1">
              <Image
                // src="/Google_Play.svg"
                src={
                  "https://imagesbdg.sgp1.digitaloceanspaces.com/65143d84-75d4-4e57-b1eb-b34505a881de"
                }
                alt=" Google playStore"
                height={90}
                width={280}
                style={{ margin: "15px 5px 8px 0", cursor: "pointer" }}
                onClick={handleImageClickPlayStore}
              />
              <Image
                // src="/appStore_logo.svg"
                src={
                  "	https://imagesbdg.sgp1.digitaloceanspaces.com/6a6840c9-41b8-48d8-922b-06e27150feaa"
                }
                alt=" Google playStore"
                height={90}
                width={280}
                style={{ margin: "15px 0 8px 5px", cursor: "pointer" }}
                onClick={handleImageClickAppStore}
              />
            </div>
            {/* <div className="startupIndia">
            <Image
              src="/Startup India.svg"
              alt="startup india logo"
              height={110}
              width={260}
            ></Image>
          </div> */}
          </div>

          <div className="main__Buy__section">
            <div className="flex">
              <div className="buy">Buy</div>
              <div className="sell">Sell</div>
            </div>
            <div>
              <div className="flex">
                <div>
                  <div className="toggle_button_spacing" onChange={toggleGold}>
                    <label className="toggle-button">
                      <input type="checkbox" />
                      <span className="slider"></span>
                      <span className="text-gold text-gold1">Silver</span>
                      <span className="text-silver text-silver1">Gold</span>
                    </label>
                  </div>
                  <div className="gold_content">
                    <div className="live_price_text">
                      <span>
                        LIVE 24K {isgold ? "99.9% GOLD" : "99.99% SILVER"} PRICE
                      </span>
                    </div>
                    <div className="flex">
                      <h2
                        className={` ${
                          isgold
                            ? "text-shine live_price"
                            : "text-shine-silver live_price_silver"
                        }`}
                      >
                        ₹{isgold ? "5957.98" : "74.87"}
                      </h2>
                      <h5 className={` ${isgold ? "gst" : "gst1"}`}>+3% GST</h5>
                    </div>
                  </div>

                  <div className="flex arrow">
                    {isgold ? (
                      <BiSolidDownArrow className="icon_decrease animate" />
                    ) : (
                      <BiSolidUpArrow className="icon_increase animate" />
                    )}
                    {/* <BiSolidDownArrowCircle className="icon_decrease animate" /> */}
                    {/* <BiSolidDownArrowAlt className="icon_decrease animate "  /> */}

                    <span
                      className={isgold ? "percentage" : "percentagesilver"}
                    >
                      {isgold ? "0.2391" : "0.0967"}%
                    </span>
                    <span className="since_yesterday">since yesterday</span>
                  </div>
                  <div className="flex timer_text" style={{ marginTop: 15 }}>
                    <div
                      className="flex"
                      style={{
                        paddingLeft: 1.5,
                        letterSpacing: 1.3,
                        fontWeight: 500,
                      }}
                    >
                      Gold rate expires in{" "}
                      <span style={{ marginLeft: 5 }}>
                        <Timer />
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: 45 }}>
                  <Image
                    className={`coin_transition ${
                      isgold ? "gold_coin" : "silver_coin"
                    }`}
                    src={
                      isgold
                        ? "https://bdgweb.testingphases.in/images/Maskgold.svg"
                        : "https://bdgweb.testingphases.in/images/Masksilver.svg"
                    }
                    alt="coin image"
                    loading="lazy"
                    width={240}
                    height={240}
                  />
                </div>
              </div>
            </div>
            {/* wallet balance and gold weight */}
            {/* <div className="flex balance_weight">
              <Image
                src={"https://bdgweb.testingphases.in/images/purse.svg"}
                alt="wallet Icon"
                width={35}
                height={35}
              />
              <div className="main_balance">
                <div className="balance">Balance</div>
                <div>₹ 7863.87</div>
              </div>
              <div className="main_weight">
                <div className="Weight">Weight</div>
                <div className={isgold ? "text-shine" : "text-shine-silver"}>
                  {isgold ? "1.2385 gm" : "8.9989 kg"}
                </div>
              </div>
            </div> */}

            <div className="main_Input">
              <div>
                <input
                  onClick={handleInputClick}
                  onChange={handleRupeesInputChange}
                  className="enter_rupees"
                  value={rupeesValue}
                  placeholder={isInputClicked ? "" : "Enter in rupees"}
                  style={{ marginLeft: 60 }}
                />
                <input
                  onChange={handleGramsInputChange}
                  className="enter_grams"
                  value={gramsValue}
                  placeholder={isInputClicked ? "" : "Enter in grams"}
                  style={{ marginLeft: 60 }}
                />
              </div>
            </div>

            <div>Quick Buy</div>
          </div>
          {/* main sections ends */}
        </div>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          perferendis itaque, nihil voluptas, eius dolores veritatis, laudantium
          quos dignissimos vero eos magni atque illum labore hic. Incidunt dicta
          dolor aperiam omnis magni similique nostrum quisquam, voluptatum
          ducimus reiciendis pariatur, in debitis placeat. Nihil quisquam
          delectus perferendis quos deleniti, velit corporis? Rem error ut id
          provident, tenetur voluptatem odit dolorum mollitia laborum quis
          quisquam totam facere tempora cupiditate eos exercitationem officiis.
          Veritatis obcaecati natus blanditiis soluta nihil necessitatibus
          accusantium odio impedit itaque qui illo at fuga, ea, amet tempore!
          Enim illo sint harum similique dolore. Aliquam, assumenda pariatur
          eveniet hic, quae sunt officiis cum qui nulla obcaecati ducimus
          cupiditate earum doloribus blanditiis ipsum amet similique? Repellat a
          quos fugit libero exercitationem perspiciatis odio adipisci animi iure
          vel natus, in, eos ratione ipsa sed est molestias tempore voluptates
          dolorem, unde facilis amet ipsam nobis blanditiis. Modi accusantium
          saepe inventore amet culpa obcaecati alias impedit commodi delectus
          quos quia nihil perspiciatis ipsam maiores, corrupti totam sint neque
          debitis similique? Et aspernatur qui soluta placeat quas odio minima
          delectus iusto tempore officia cumque eveniet doloribus illum dolorem
          tenetur eum, deserunt, blanditiis nostrum adipisci odit facilis neque
          architecto. Est sed adipisci quia vel temporibus praesentium nihil
          repudiandae quidem deleniti et blanditiis maxime quae facilis
          voluptatem earum corporis tempora cum ratione, incidunt iste harum
          architecto culpa nulla! Inventore quos, voluptatum mollitia ex ipsum
          quibusdam blanditiis! Earum unde cumque in praesentium, cupiditate
          quod officia iure ipsum? Inventore iure doloremque nihil minus sunt
          ipsum. Exercitationem officiis provident quas voluptate quos modi
          dignissimos quis ipsa. Perferendis, vel? Voluptatum id facilis veniam
          odio fugit exercitationem necessitatibus corrupti, consequuntur
          quaerat vitae enim! Quis quas laudantium incidunt, earum voluptate
          cupiditate delectus aperiam officia illo quae nisi unde iusto,
          explicabo ipsum tenetur dicta magni. Ut pariatur quibusdam tempora quo
          quae dolores rerum perferendis, tenetur soluta. Obcaecati odio, illo
          praesentium accusantium ea, voluptas accusamus, perferendis
          voluptatibus necessitatibus at quam quo quae fugiat aperiam odit
          reiciendis fugit omnis doloribus sequi quidem totam beatae dicta
          nostrum! Voluptates laborum corporis fugit corrupti tenetur quidem
          maiores eos qui aperiam, voluptatibus magni libero repudiandae, ea
          laboriosam non voluptate ullam! Reiciendis enim facere laudantium
          eligendi. Repellendus debitis illo saepe quasi ab voluptatem quis vel
          autem fugit exercitationem impedit earum, iusto quae laboriosam,
          quisquam possimus tempore atque illum modi, odio facere temporibus
          deleniti voluptatibus! Facilis mollitia omnis dolores sed aliquam
          corrupti molestias minus qui magni suscipit asperiores nam consequatur
          et eius maxime, nemo officia accusantium pariatur fugit delectus quas
          odit quisquam sint perspiciatis! Labore veritatis maxime earum
          placeat, sequi quaerat deserunt natus porro quasi cum repudiandae,
          modi debitis optio molestias quam ipsum esse vitae expedita.
          Consequuntur ab non odio ex perspiciatis. Laudantium doloremque modi
          exercitationem quidem, eius porro nam in autem quas corrupti, ipsum
          magni perferendis illum optio accusantium quae id similique rerum
          eveniet? Aliquam alias repellat, at voluptatibus sapiente consequuntur
          itaque, harum quaerat quod rem excepturi voluptas expedita, doloribus
          temporibus sequi laboriosam nobis. Excepturi, tempora aspernatur.
          Omnis, itaque corrupti. Dolores eius quae vel reprehenderit quasi
          accusamus adipisci at voluptate odit.
        </div>
      </div>
    </main>
  );
}

// export default HeroSection;
