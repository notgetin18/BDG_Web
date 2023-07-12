import Link from "next/link";
import React from "react";
import Image from "next/image";

const MainHeader = () => {
  return (
    <nav className="main-nav flex">
      <div className="logo">
        <Link href="/">
          <Image alt="company logo" src="/logo.png" width={130} height={60} />
        </Link>
      </div>

      <div className="nav-links">
        <ul className="flex">
          <li>
            <Link className="hover-links" href="/">
              <span className="link-text">Home</span>
            </Link>
          </li>
          <li>
            <Link className="hover-links" href="/about">
              <span className="link-text">About</span>
            </Link>
          </li>
          <li>
            <Link className="hover-links" href="/contact">
              <span className="link-text">Contact</span>
            </Link>
          </li>
          <li>
            <Link className="hover-links" href="#">
              <span className="link-text text-shine">Coins</span>
            </Link>
          </li>
          <li>
            <Link className="hover-links" href="#">
              <span className="link-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className="hover-links for-margin" href="#">
              <span className="link-text">My Account</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainHeader;
