import styled from 'styled-components'

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
  padding: 20px;

  > div:first-child {
    width: 100%;
    max-width: 450px;
  }
`;

export const LoginContainer = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.9) 100%);
  border: 1px solid rgba(16, 55, 231, 0.2);
  border-radius: 16px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
  backdrop-filter: blur(10px);
  width: 100%;

  .login-head {
    text-align: center;
    margin-bottom: 40px;
   

    h2 {
      font-size: 32px;
      font-weight: 800;
      color: white;
      margin: 0 0 12px 0;
      letter-spacing: 1px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: #cbd5e1;
      margin: 0;
      letter-spacing: 0.5px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;

    .form-body {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 8px;
      color: white;

      p {
        font-size: 14px;
        font-weight: 700;
        color: white;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      input {
        height: 48px;
        width: 100%;
        border-radius: 8px;
        padding: 0 5px;
        border: 1px solid rgba(102, 126, 234, 0.3);
        background: rgba(255, 255, 255, 0.05);
        color: white;
        font-size: 14px;
        transition: all 0.3s ease;
        font-family: inherit;

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
      }
    }

    button[type="submit"] {
      height: 48px;
      width: 100%;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      margin-top: 10px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
      }

      &:active {
        transform: translateY(0);
      }
    }

    span {
      text-align: center;
      font-size: 13px;
      color: #cbd5e1;
      margin-top: 12px;
      line-height: 1.6;

      a {
        color: #7dd3fc;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          color: #667eea;
          text-decoration: underline;
        }
      }

      &:first-of-type {
        margin-top: 5px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
    border-radius: 12px;

    .login-head h2 {
      font-size: 28px;
    }

    form {
      gap: 18px;

      .form-body input {
        height: 44px;
        font-size: 13px;
      }

      button[type="submit"] {
        height: 44px;
        font-size: 14px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 30px 20px;

    .login-head h2 {
      font-size: 24px;
    }

    form {
      gap: 16px;

      .form-body input {
        height: 40px;
        padding: 0 12px;
      }

      button[type="submit"] {
        height: 40px;
        font-size: 13px;
      }

      span {
        font-size: 12px;
      }
    }
  }
`;