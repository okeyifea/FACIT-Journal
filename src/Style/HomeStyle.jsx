import styled from "styled-components";

export const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: 0 30px;
`;

export const HomeText = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:100%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 50px;
  border-radius: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>');
    pointer-events: none;
  }

  p {
    position: relative;
    z-index: 1;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    margin: 8px 0;
  }
`;

export const SearchBar = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;

  .search_bar {
    display: flex;
    justify-content: center;
    gap: 0;
    align-items: center;
    background: white;
    border-radius: 50px;
    padding: 8px 20px;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.25);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.35);
    }

    span {
      color: #999;
      font-size: 14px;
      margin-right: 12px;
    }

    input {
      border: none;
      background: transparent;
      outline: none;
      font-size: 14px;
      color: #333;
      padding: 8px 12px;
      width: 250px;

      &::placeholder {
        color: #ccc;
      }
    }

    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 30px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      margin-top: 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
    }
  }
`;

export const LatestPublicationHeader = styled.div`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
  padding: 0 20px;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: #000;
    margin: 0;
    position: relative;
    display: inline-block;
    letter-spacing: 0.5px;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
    }
  }
`;

export const PublishedPapers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: row;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px;

  .article-card {
    border: none;
    border-radius: 12px;
    padding: 25px;
    width: 300px;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    position: relative;
    overflow: hidden;
    border-top: 4px solid #667eea;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
      border-top-color: #764ba2;

      &::before {
        left: 100%;
      }
    }

    h3 {
      margin: 0 0 12px 0;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.3px;
    }

    p {
      margin: 8px 0;
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.5;

      &:first-of-type {
        color: #7dd3fc;
        font-weight: 500;
      }
    }

    a {
      color: #667eea;
      text-decoration: none;
      margin-right: 12px;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;

      &:hover {
        color: #764ba2;
        text-decoration: underline;
      }
    }

    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      margin-top: 12px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      }
    }
  }
`;