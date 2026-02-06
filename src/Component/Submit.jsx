import React , {useState}from "react";
import styled from "styled-components";
//import Header from "./Header";
import Layout from "./Common/layout";
import SideNav from "./SideNav";

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
        <SubmitContainer>
          <HeaderSection>
            <h1>Submit Your Research Paper</h1>
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
        </SubmitContainer>
      </Main>
    </Layout>
  );
};

export default Submit;

const SubmitContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 30px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;
const Main = styled.main``;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 42px;
    font-weight: 800;
    color: white;
    margin: 0 0 15px 0;
    letter-spacing: 1px;
  }

  p {
    font-size: 16px;
    color: #cbd5e1;
    margin: 0;
    letter-spacing: 0.5px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 32px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const FormWrapper = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.8) 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);

  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  color: white;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;

  option {
    background: #1e293b;
    color: white;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }
`;

const FileInput = styled.input`
  padding: 12px 15px;
  border: 2px dashed rgba(102, 126, 234, 0.5);
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.05);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FileHelp = styled.small`
  color: #94a3b8;
  font-size: 12px;
  margin-top: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #667eea;
  }

  span {
    line-height: 1.5;
  }

  &:hover {
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 35px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResetButton = styled.button`
  flex: 1;
  padding: 14px 30px;
  background: transparent;
  color: white;
  border: 2px solid rgba(102, 126, 234, 0.5);
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
