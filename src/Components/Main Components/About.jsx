import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Typography, Avatar, Button } from "antd";
import { motion } from "framer-motion";
import {
    SmileOutlined,
    RocketOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";

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
    const [activeSlide, setActiveSlide] = useState(0);
    const autoPlayRef = useRef(null);

    // Team members data with their designations
    const teamMembers = [
        { name: "Aman", designation: "Co-founder", image: "/aman.jpg" },
        { name: "Kasam", designation: "Founder", image: "/kasam.jpg" },
        { name: "Rohit", designation: "Co-founder", image: "/rohit.jpg" },
        { name: "Sameer Bhusal", designation: "Outreach Manager", image: "/sameer.jpg" }
    ];

    // Calculate total number of slides based on responsive view
    const getItemsPerSlide = () => {
        // This is a simple responsive calculation - you can adjust these breakpoints
        if (window.innerWidth < 576) return 1; // Mobile: 1 item
        if (window.innerWidth < 992) return 2; // Tablet: 2 items
        return 3; // Desktop: 3 items
    };

    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerSlide(getItemsPerSlide());
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalSlides = Math.ceil(teamMembers.length / itemsPerSlide);

    // Handle next slide
    const nextSlide = () => {
        setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    // Handle previous slide
    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    // Go to specific slide
    const goToSlide = (index) => {
        setActiveSlide(index);
    };

    // Auto play functionality
    useEffect(() => {
        autoPlayRef.current = nextSlide;
    });

    useEffect(() => {
        const play = () => {
            autoPlayRef.current();
        };

        const interval = setInterval(play, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (window.innerWidth > 700) {
            // If the screen width is less than 700px, scroll 120px from the top
            window.scrollTo({ top: 150, behavior: 'smooth' });
        } else {
            // If the screen width is greater than 150px, you can specify some other behavior
            // For example, scroll to a different position or trigger a different action
            window.scrollTo({ top: 120, behavior: 'smooth' });
        }
    }, []);

    return (
        <div style={{ padding: "50px 20px", maxWidth: "1200px", margin: "0 auto" }}>
            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                <Title level={1} style={{ textAlign: "center" }}>
                    About Us
                </Title>
                <Paragraph style={{ textAlign: "center", fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                    EduSphere is built by a passionate team of young innovators and guided by experienced minds. We aim to make digital learning accessible, engaging, and impactful for everyone.
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
            <motion.div variants={fadeInUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Paragraph style={{ textAlign: "center", fontSize: "16px", maxWidth: "800px", margin: "20px auto 40px" }}>
                    Our core team consists of motivated young developers and thinkers, supported by experienced advisors who believe in the power of technology to bring about change. Together, we build, learn, and evolve.
                </Paragraph>
            </motion.div>

            {/* Team Section - Modern Group Slider */}
            <div style={{ marginTop: 80 }}>
                <motion.div variants={fadeInUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <Title level={2} style={{ textAlign: "center" }}>
                        Meet the Team
                    </Title>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    custom={4}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{
                        position: "relative",
                        marginTop: 30,
                        overflow: "hidden"
                    }}
                >
                    {/* Modern Team Slider */}
                    <div style={{ position: "relative", padding: "20px 0" }}>
                        <div
                            style={{
                                display: "flex",
                                transition: "transform 0.5s ease",
                                transform: `translateX(-${activeSlide * 100}%)`,
                                marginBottom: "30px"
                            }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    style={{
                                        minWidth: "100%",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Row gutter={[24, 24]} justify="center">
                                        {teamMembers
                                            .slice(
                                                slideIndex * itemsPerSlide,
                                                Math.min((slideIndex + 1) * itemsPerSlide, teamMembers.length)
                                            )
                                            .map((member, memberIndex) => (
                                                <Col
                                                    xs={24}
                                                    sm={itemsPerSlide === 1 ? 24 : 12}
                                                    md={itemsPerSlide === 3 ? 8 : 12}
                                                    key={memberIndex}
                                                >
                                                    <Card
                                                        hoverable
                                                        bordered
                                                        style={{
                                                            textAlign: "center",
                                                            borderRadius: 16,
                                                            overflow: "hidden",
                                                            height: "100%",
                                                            boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                                                            transition: "all 0.3s ease"
                                                        }}
                                                        bodyStyle={{
                                                            padding: "24px 16px"
                                                        }}
                                                    >
                                                        <div style={{ marginBottom: 16 }}>
                                                            <Avatar
                                                                size={100}
                                                                src={member.image}
                                                                style={{
                                                                    border: "4px solid #f0f2f5"
                                                                }}
                                                            />
                                                        </div>
                                                        <Title level={4} style={{ marginBottom: 4 }}>
                                                            {member.name}
                                                        </Title>
                                                        <Paragraph
                                                            style={{
                                                                color: "#1890ff",
                                                                fontSize: "15px",
                                                                fontWeight: 500,
                                                                margin: 0
                                                            }}
                                                        >
                                                            {member.designation}
                                                        </Paragraph>
                                                    </Card>
                                                </Col>
                                            ))}
                                    </Row>
                                </div>
                            ))}
                        </div>

                        {/* Modern Navigation Controls */}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "16px"
                        }}>


                            {/* Slider Dots */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 8
                                }}
                            >
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        style={{
                                            width: activeSlide === index ? 24 : 12,
                                            height: 8,
                                            borderRadius: 4,
                                            background: activeSlide === index ? "#1890ff" : "#d9d9d9",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
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
                    Reach out to us and let's explore how we can build something great together.
                </Paragraph>
                <Button type="primary" size="large" shape="round" className="my-3">
                    <a href="mailto:edusphere.learn@gmail.com">Contact Us</a>
                </Button>
            </motion.div>
        </div>
    );
};

export default About;