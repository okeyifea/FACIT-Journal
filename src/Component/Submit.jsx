import React , {useState}from "react";
//import styled from "styled-components";
//import Header from "./Header";
import Layout from "./Common/layout";
import SideNav from "./SideNav";

import {
  Main,
  HeaderSection,
  FormWrapper,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  FileInput,
  FileHelp,
  CheckboxLabel,
  ButtonGroup,
  SubmitButton,
  ResetButton
} from "../Style/SubmitStyle.jsx";

import { API_URL } from "../../server/API/Auth.js";


const Submit = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    category: "",
    abstract: "",
    submittedBy: user?.email,
    pdf: null,
    confirm: false
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] || null });
    } else {
      setFormData({
        ...formData,
        [name]: name === "category" ? (value ? Number(value) : "") : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("authors", formData.authors);      
    data.append("abstract", formData.abstract);
   data.append("category", formData.category);
   data.append("submittedBy", formData.submittedBy);            
   data.append("role", user.role);
   data.append("pdf", formData.pdf);

  for (let pair of data.entries()) {
   console.log(pair[0], pair[1]);
 }


      const res = await fetch(`${API_URL}/api/research`, {
        method: "POST",
        body: data
      });

      const result = await res.json();
      setMessage(result.message || "Paper submitted");
      if (res.ok) {
        setFormData({
          title: "",
          authors: "",
          category: "",
          abstract: "",
          submittedBy: user?.email ,
          pdf: null,
          confirm: false
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SideNav user={user} onLogout={() => setUser?.(null)} />
        <Main>
          <HeaderSection>
            <h1 style={{ fontSize: "35px", fontWeight: "800", margin: "0", color: "white" }}>
              Submit Your Research Paper
            </h1>
            <p>Contribute to our growing collection of academic research</p>
          </HeaderSection>

          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Paper Title *</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter the title of your research paper"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="authors">Author *</Label>
                <Input
                  type="text"
                  id="authors"
                  name="authors"
                  placeholder="Enter author names (comma-separated)"
                  value={formData.authors}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="category">Research Category *</Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="1">Artificial Intelligence</option>
                  <option value="2">Cloud Computing</option>
                  <option value="3">Cybersecurity</option>
                  <option value="4">Quantum Computing</option>
                  <option value="5">Blockchain</option>
                  <option value="6">Data Science</option>
                  <option value="7">Other</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="abstract">Abstract *</Label>
                <TextArea
                  id="abstract"
                  name="abstract"
                  rows="6"
                  placeholder="Provide a brief summary of your research (150-250 words)"
                  value={formData.abstract}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="pdf">Upload Paper (PDF) *</Label>
                <FileInput
                  type="file"
                  id="pdf"
                  name="pdf"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                />
                <FileHelp>Maximum file size: 10MB. PDF format only.</FileHelp>
              </FormGroup>

              <FormGroup>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    name="confirm"
                    checked={formData.confirm}
                    onChange={handleChange}
                    required
                  />
                  <span>I confirm that this is original work and grant permission for publication</span>
                </CheckboxLabel>
              </FormGroup>

              <ButtonGroup>
                <SubmitButton type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Paper"}
                </SubmitButton>
                <ResetButton type="reset">Clear Form</ResetButton>
              </ButtonGroup>

              {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
            </form>
          </FormWrapper>
          </Main>
    </Layout>
  );
};

export default Submit;
