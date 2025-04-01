import React, { useState, useEffect } from "react";
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

const DisplayInput = styled.input`
  font-size: 2rem;
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  outline: none;
  text-align: right;
  max-width: 100%;
  white-space: nowrap;
`;

const HistoryList = styled.div`
  max-height: 150px;
  overflow-y: auto;
  font-size: 1rem;
  color: #bbb;
  width: 100%;
  text-align: right;
  margin-bottom: 10px;
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

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [isResult, setIsResult] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay(e.target.value);
    setIsResult(false);
  };

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
      setHistory((prevHistory) => [
        ...prevHistory,
        `${display} = ${result}`,
      ]);
      setDisplay(result.toString());
      setIsResult(true);
    } catch {
      setError("Invalid Expression");
      setOpen(true);
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setHistory([]);
    setIsResult(false);
  };

  const deleteLast = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    setIsResult(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
      handleClick(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleOperator(key);
    } else if (key === "Enter") {
      calculateResult();
    } else if (key === "Backspace") {
      deleteLast();
    } else if (key === "Escape") {
      clearAll();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display]);

  return (
    <Container maxWidth="xs">
      <CalculatorWrapper>
        <Typography variant="h4" color="white" gutterBottom>
          <strong>CALCULATOR</strong>
        </Typography>
        <HistoryList>
          {history.length === 0 ? (
            <Typography variant="body2" color="#bbb">
              No history available
            </Typography>
          ) : (
            history.map((entry, index) => (
              <div key={index}>{entry}</div>
            ))
          )}
        </HistoryList>
        <DisplayWrapper>
          <DisplayInput
            value={display}
            onChange={handleChange}
            placeholder="0"
          />
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
