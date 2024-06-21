import { FooterStyle, FooterStyleBlock, FooterStyleInner, FooterStyleBottom } from "@style";
import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <FooterStyle>
      <Container>
        <FooterStyleInner>
          <Row>
            <Col  md={3}>
              <FooterStyleBlock>
                <h3>COMPANY </h3>
                <ul>
                  <li>
                    <Link href="#">About Alpha Equipment Listings</Link>
                  </li>
                  <li>
                    <Link href="#">Blog</Link>
                  </li>
                  <li>
                    <Link href="#">Ipsum posuere</Link>
                  </li>
                  <li>
                    <Link href="#">Lorem Ipsum facilisis</Link>
                  </li>
                </ul>
              </FooterStyleBlock>
            </Col>
            <Col md={2}>
              <FooterStyleBlock>
                <h3>Support </h3>
                <ul>
                  <li>
                    <Link href="#">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="#">Buying</Link>
                  </li>
                  <li>
                    <Link href="#">Selling</Link>
                  </li>
                  <li>
                    <Link href="#">Lorem Ipsum</Link>
                  </li>
                </ul>
              </FooterStyleBlock>
            </Col>
            <Col md={{ span: 2, offset: 1 }}>
              <FooterStyleBlock>
                <h3>Popular Items </h3>
                <ul>
                  <li>
                    <Link href="#">Construction Machinery</Link>
                  </li>
                  <li>
                    <Link href="#">Truck Auction</Link>
                  </li>
                  <li>
                    <Link href="#">Cranes For Sale</Link>
                  </li>
                  <li>
                    <Link href="#">Tractors For Rent</Link>
                  </li>
                </ul>
              </FooterStyleBlock>
            </Col>
            <Col md={{ span: 3, offset: 1 }}>
              <FooterStyleBlock className="footer-social-block">
                <h3>Social MEDIA</h3>
                <ul>
                  <li>
                    <Link href="#">
                      <img src="/assets/icons/social-facebook.svg" alt="icon" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <img src="/assets/icons/social-twitter.svg" alt="icon" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <img src="/assets/icons/social-instagram.svg" alt="icon" />
                    </Link>
                  </li>
                </ul>
              </FooterStyleBlock>
            </Col>
          </Row>
        </FooterStyleInner>
          <Row>
            <Col md={12}>
              <FooterStyleBottom>
                <p>
                  © <Link href="#">Alpha Equipment Listings 2022</Link>
                </p>
              </FooterStyleBottom>
            </Col>
          </Row>
      </Container>
      {/* <div className="section">
				<h6>Company</h6>
				<ul>
					<li>About Alpha Equipment Listing</li>
					<li>Blog</li>
					<li>lorem ipsume</li>
					<li>Lorem Ipsum facilitise</li>
				</ul>
			</div>
			<div className="section">
				<h6>Company</h6>
				<ul>
					<li>About Alpha Equipment Listing</li>
					<li>Blog</li>
					<li>lorem ipsume</li>
					<li>Lorem Ipsum facilitise</li>
				</ul>
			</div>
			<div className="section">
				<h6>Company</h6>
				<ul>
					<li>About Alpha Equipment Listing</li>
					<li>Blog</li>
					<li>lorem ipsume</li>
					<li>Lorem Ipsum facilitise</li>
				</ul>
			</div>
			<div className="section">
				<h6>Company</h6>
				<ul>
					<li>About Alpha Equipment Listing</li>
					<li>Blog</li>
					<li>lorem ipsume</li>
					<li>Lorem Ipsum facilitise</li>
				</ul>
			</div> */}
    </FooterStyle>
  );
};

export default Footer;
