import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Snackbar } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactSelect = styled.select`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactOption = styled.option`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const AdditionalInputContainer = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  max-height: ${({ isVisible }) => (isVisible ? "100px" : "0")};
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
`;

const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedSubject, setSelectedSubject] = React.useState("");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    if (selectedSubject !== "for_other") {
      formData.set("subject", selectedSubject);
    } else {
      formData.set("subject", formData.get("other_subject"));
    }

    // إعداد نسخة إضافية لإرسال الرسالة إلى البريد الإلكتروني المُدخِل
    const templateParams = {
      from_email: formData.get("from_email"),
      from_name: formData.get("from_name"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      reply_to: formData.get("from_email"), // هنا يتم إعداد "reply_to" ليكون البريد الإلكتروني المُدخِل
    };

    emailjs
      .send(
        "service_8qjeoc3",
        "template_r19vcrm",
        templateParams,
        "pcNX7DAoy9cYwocxa"
      )
      .then(
        (result) => {
          setOpen(true);
          form.current.reset();
          setSelectedSubject("");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactSelect
            name="subject"
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
          >
            <ContactOption value="">Select Subject</ContactOption>
            <ContactOption value="for_job">Job</ContactOption>
            <ContactOption value="for_freelance">Freelance</ContactOption>
            <ContactOption value="for_feedback">Feedback</ContactOption>
            <ContactOption value="for_other">Other</ContactOption>
          </ContactSelect>
          <AdditionalInputContainer isVisible={selectedSubject === "for_other"}>
            <ContactInput placeholder="Specify Subject" name="other_subject" />
          </AdditionalInputContainer>
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  );
};

export default Contact;
