import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "@emotion/styled";
import microphone from "../../images/headphone.svg";
import linebreaker from "../../images/line-breaker.svg";
import { css } from "@emotion/core";

const Wrapper = styled.div`
  background: transparent
    linear-gradient(117deg, #29235f 0%, #3f5696 48%, #212362 100%);
  height: 100vh;
`;

const Container = styled.div`
  text-align: center;
  padding: 32px 0px;
  width: 90%;
  margin: 0 auto;
  height: 700px;
  position: relative;
`;
const Microphone = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
`;

const StyledImg = styled.img`
  width: 220px;
  height: 220px;
`;

const StyledLine = styled.img`
  height: 210px;
`;

const dynamicStyle = (props: any) =>
  css`
    white-space: pre-wrap !important;
    min-inline-size: max-content;
    display: flex;
    flex-basis: 100%;
    padding: 0px 10px;
    font-size: 22px;
    color: #ffffffd6;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    position: absolute;
    right: 0;
    z-index: 111;

    // animation: marquee 16s linear infinite;
    // animation-play-state: ${props.state}:"play":"paused";
    // animation-iteration-count: 1;
    // @keyframes marquee {
    //   0% {
    //     transform: translate(100%, 0);
    //   }
    //   100% {
    //     transform: translate(-100%, 0);
    //   }
    // }
  `;

const dynamicStyle0 = (props: any) =>
  css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `;

const StyledSpan: any = styled.span`
  ${dynamicStyle};
`;

const StyledSection = styled.div`
  width: 100%;
  overflow: hidden;
  display: inline-flex;
  position: relative;
  top: -15%;  
  border-left: 3px solid #f1e7ab;
  border-right: 3px solid #f1e7ab;
  background: #5a69a9 0% 0% no-repeat padding-box;

  position: relative;
  height: 30px;
  align-items: center;
`;

const StyledText = styled.input`
  color:white;
  background: #5a69a9 0% 0% no-repeat padding-box;
  position:absolute;
  left: 80%;
  top: 60px;
  width:50px;
  font-size:20px;
  text-align:center;
`;

const StyledLabel = styled.label`
  color:white;
  position:absolute;
  left: 73%;
  top: 63px;
  width:60px;
  font-size:20px;
  text-align:center;
`;

let animation: boolean = false;
let showText: string = "";
let interval: any = null
const Transcription = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listen, setListen] = useState(true);
  const [timer, setTimer] = useState(0);
  const [transcriptLength, setTranscriptLength] = useState(0);
  const [preTranscript, setPreTranscript] = useState('');
  const [status, setStatus] = useState(false);
  const [duration, setDuration] = useState(5);

  useEffect(() => {
    interval = setInterval(
      () => setTimer((prev: number) => prev + 1),
      duration * 10
    );
  }, []);

  useEffect(() => {

    if (status) {
      if (preTranscript == transcript) {
        showText = showText + " ";
      } else {
        setPreTranscript(transcript);
        showText = showText + transcript.slice(preTranscript.length, transcript.length);
      }
    }

  }, [timer]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return "Browser doestn't supports.";
  }

  const handleStart = () => {
    setStatus(!status);
    if (listen) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
    setListen(!listen);
  };

  const inputChange = (event: any) => {
    setDuration(event.target.value);
    clearInterval(interval);
    interval = setInterval(
      () => setTimer((prev: number) => prev + 1),
      duration * 10
    );
    console.log(duration);
  }

  return (
    <Wrapper>
      <Container>
        <StyledLine src={linebreaker} alt="Line" />
        
        <StyledLabel>Duration(s):</StyledLabel>
        <StyledText type="number" value={duration} onChange={inputChange}></StyledText>

        <StyledSection>
          <StyledSpan state={animation}>{showText}</StyledSpan>
        </StyledSection>

        <Microphone onClick={handleStart}>
          <StyledImg src={microphone} alt="microphone" />
        </Microphone>
      </Container>
    </Wrapper>
  );
};
export default Transcription;
