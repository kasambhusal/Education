import React, { useEffect } from "react";
import { Row, Col, Card, Typography, Avatar, Button } from "antd";
import { motion } from "framer-motion";
import { SmileOutlined, RocketOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6 },
    }),
};

const About = () => {
    useEffect(() => {
        window.scrollTo({ top: 110, behavior: 'smooth' });
    }, []);
    return (
        <div style={{ padding: "50px 20px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <Title level={1} style={{ textAlign: "center" }}>
                    About Us
                </Title>
                <Paragraph style={{ textAlign: "center", fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                    We are a passionate team dedicated to creating impactful solutions that blend innovation with simplicity.
                </Paragraph>
            </motion.div>

            {/* Mission & Vision */}
            <Row gutter={[24, 24]} style={{ marginTop: 50 }}>
                <Col xs={24} md={12}>
                    <motion.div variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Card bordered hoverable style={{ borderRadius: 20 }}>
                            <RocketOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
                            <Title level={3}>Our Mission</Title>
                            <Paragraph>
                                To empower people through technology by delivering smart and accessible digital tools for everyone.
                            </Paragraph>
                        </Card>
                    </motion.div>
                </Col>
                <Col xs={24} md={12}>
                    <motion.div variants={fadeInUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Card bordered hoverable style={{ borderRadius: 20 }}>
                            <SmileOutlined style={{ fontSize: "40px", color: "#52c41a" }} />
                            <Title level={3}>Our Vision</Title>
                            <Paragraph>
                                To become a leading force in tech-driven change, helping communities grow through innovation and learning.
                            </Paragraph>
                        </Card>
                    </motion.div>
                </Col>
            </Row>

            {/* Team Section */}
            <div style={{ marginTop: 80 }}>
                <motion.div variants={fadeInUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Title level={2} style={{ textAlign: "center" }}>
                        Meet the Team
                    </Title>
                </motion.div>
                <Row justify="center" gutter={[24, 24]} style={{ marginTop: 30 }}>
                    {["rohit", "kasam", "aman"].map((name, index) => {
                        const designation = name === "rohit" ? "Graphics Designer" : "Software Developer"
                        return (
                            <Col xs={24} sm={12} md={8} key={index}>
                                <motion.div variants={fadeInUp} custom={index + 4} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <Card bordered style={{ textAlign: "center", borderRadius: 20 }}>
                                        <Avatar size={100} src={`/${name}.jpg`} />
                                        <Title level={4} style={{ marginTop: 15 }}>{name}</Title>
                                        <Paragraph>{designation}</Paragraph>
                                    </Card>
                                </motion.div>
                            </Col>
                        )
                    })}
                </Row>
            </div>

            {/* Call to Action */}
            <motion.div
                style={{
                    marginTop: 100,
                    background: "#f0f2f5",
                    padding: "40px 20px",
                    borderRadius: 20,
                    textAlign: "center",
                }}
                variants={fadeInUp}
                custom={7}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Title level={2}>Want to collaborate with us?</Title>
                <Paragraph style={{ maxWidth: 600, margin: "0 auto" }}>
                    Reach out to us and let’s explore how we can build something great together.
                </Paragraph>
                <Button type="primary" size="large" shape="round" className="my-3">
                    <a href="mailto:developerkasam@gmail.com">Contact Us</a>
                </Button>
            </motion.div>
        </div>
    );
};

export default About;
