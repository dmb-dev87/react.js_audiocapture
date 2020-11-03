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
  // width: 1400px;
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

let animation: boolean = false;
let showText: string =  "";
const Transcription = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listen, setListen] = useState(true);
  const [timer, setTimer] = useState(0);
  const [transcriptLength, setTranscriptLength] = useState(0);
  const [preTranscript, setPreTranscript] = useState('');
  const [status, setStatus] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(
      () => setTimer((prev: number) => prev + 1),
      100
    );
  }, []);

  useEffect(() => {

    // var splitTextArray = transcript.split(" ");
    // console.log(splitTextArray);
    // showText = showText + splitTextArray.join(" ");
    if (status){
      console.log(preTranscript, transcript);
      showText = showText + " ";
      console.log(showText);
      if (preTranscript == transcript) {
      showText = showText + " ";
      } else {
        setPreTranscript(transcript);
        showText = showText + transcript.slice(preTranscript.length, transcript.length);
      }  
    }

    // if (transcript.length > 10) {
    //   if (transcript.length === transcriptLength) {
    //     // console.log(animation);
    //     animation = false;
    //   } else {
    //     setTranscriptLength(transcript.length);
    //     animation = true;
    //     // console.log(animation);
    //   }
    // }
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

  return (
    <Wrapper>
      <Container>
        <StyledLine src={linebreaker} alt="Line" />

        {/* <StyledSection>
          {transcript.length < 60 ? (
            <StyledSpan state="paused">{transcript}</StyledSpan>
          ) : (
            <StyledSpan state="play">{transcript}</StyledSpan>
          )}
        </StyledSection> */}
        <StyledSection>
          <StyledSpan state={animation}>{showText}</StyledSpan>
        </StyledSection>
 
        <Microphone onClick={handleStart}>
          {/* <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={resetTranscript}>Reset</button> */}
          <StyledImg src={microphone} alt="microphone" />
        </Microphone>
      </Container>
    </Wrapper>
  );
};
export default Transcription;
