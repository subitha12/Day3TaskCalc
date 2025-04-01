import React, { useState } from "react";
import { Button, Typography, Snackbar, Alert, Container } from "@mui/material";
import styled from "styled-components";

const CalculatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #222;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 300px;
`;

const DisplayWrapper = styled.div`
  width: 100%;
  background: #333;
  color: white;
  padding: 10px;
  border-radius: 10px;
  text-align: right;
  min-height: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  word-wrap: break-word;
`;

const DisplayText = styled.div`
  font-size: 2rem;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
`;

const HistoryText = styled.div`
  font-size: 1rem;
  color: #bbb;
  min-height: 20px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const CalcButton = styled(Button)`
  && {
    font-size: 1.5rem;
    background: #444;
    color: white;
    padding: 15px;
    border-radius: 10px;
    min-width: 70px;
    min-height: 40px;
    &:hover {
      background: #666;
    }
  }
`;

const OperatorButton = styled(CalcButton)`
  && {
    background: #f39c12;
    &:hover {
      background: #e67e22;
    }
  }
`;

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [history, setHistory] = useState<string>("");
  const [isResult, setIsResult] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleClose = () => setOpen(false);

  const handleClick = (value: string) => {
    if (isResult) {
      setDisplay(value);
      setIsResult(false);
    } else {
      setDisplay((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const handleOperator = (operator: string) => {
    if (!/[+\-*/]$/.test(display)) {
      setDisplay((prev) => prev + operator);
      setIsResult(false);
    }
  };

  const calculateResult = () => {
    try {
      const result = eval(display);
      setHistory(display + " =");
      setDisplay(result.toString());
      setIsResult(true);
    } catch {
      setError("Invalid Expression");
      setOpen(true);
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setHistory("");
    setIsResult(false);
  };

  const deleteLast = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    setIsResult(false);
  };

  return (
    <Container maxWidth="xs">
      <CalculatorWrapper>
        <Typography variant="h4" color="white" gutterBottom>
          <strong>CALCULATOR</strong>
        </Typography>
        <DisplayWrapper>
          <HistoryText>{history}</HistoryText>
          <DisplayText>{display}</DisplayText>
        </DisplayWrapper>
        <ButtonGrid>
          <CalcButton onClick={clearAll}>C</CalcButton>
          <CalcButton onClick={deleteLast}>⌫</CalcButton>
          <CalcButton onClick={() => handleOperator("%")}>%</CalcButton>
          <OperatorButton onClick={() => handleOperator("/")}>÷</OperatorButton>
          <CalcButton onClick={() => handleClick("7")}>7</CalcButton>
          <CalcButton onClick={() => handleClick("8")}>8</CalcButton>
          <CalcButton onClick={() => handleClick("9")}>9</CalcButton>
          <OperatorButton onClick={() => handleOperator("*")}>×</OperatorButton>
          <CalcButton onClick={() => handleClick("4")}>4</CalcButton>
          <CalcButton onClick={() => handleClick("5")}>5</CalcButton>
          <CalcButton onClick={() => handleClick("6")}>6</CalcButton>
          <OperatorButton onClick={() => handleOperator("-")}>-</OperatorButton>
          <CalcButton onClick={() => handleClick("1")}>1</CalcButton>
          <CalcButton onClick={() => handleClick("2")}>2</CalcButton>
          <CalcButton onClick={() => handleClick("3")}>3</CalcButton>
          <OperatorButton onClick={() => handleOperator("+")}>+</OperatorButton>
          <CalcButton onClick={() => handleClick("0")} style={{ gridColumn: "span 2" }}>0</CalcButton>
          <CalcButton onClick={() => handleClick(".")}>.</CalcButton>
          <OperatorButton onClick={calculateResult}>=</OperatorButton>
        </ButtonGrid>
      </CalculatorWrapper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Calculator;
