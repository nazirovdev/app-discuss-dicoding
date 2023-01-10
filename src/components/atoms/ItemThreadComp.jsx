import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BiCommentDots } from 'react-icons/bi';
import styled from 'styled-components';
import { GlobalCss } from './NavbarComp';

export const bgColors = {
  light: '#F1F5F9',
  dark: '#334155',
};

export const colors = {
  light: '#334155',
  dark: '#F1F5F9',
};

export const ItemThreadContainer = styled.article`
  background-color: ${({ bgColor }) => bgColors[bgColor]};
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border: solid #CBD5E1 2px;
  border-radius: 10px;
`;
ItemThreadContainer.defaultProps = {
  bgColor: '#F1F5F9',
};

export const IconContainer = styled.i`
  background-color: ${({ bgColor }) => bgColors[bgColor]};
  color: ${({ color }) => colors[color]};
  display: flex;
  cursor: pointer;
`;
IconContainer.defaultProps = {
  bgColor: '#F1F5F9',
  color: '#334155',
};

export const WrapperItemThread = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const ThreadTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ color }) => colors[color]};
`;
ThreadTitle.defaultProps = {
  color: '#334155',
};

export const ThreadCategory = styled.div`
  background-color: #CBD5E1;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
  padding: 0.7rem;
  width: fit-content;
  font-size:1.150rem;
  border-radius: 10px;
  font-weight: bold;
`;

export const ThreadBody = styled.p`
  font-size:1.125rem;
  color: ${({ color }) => colors[color]};
`;
ThreadBody.defaultProps = {
  color: '#334155',
};

export const ImageThread = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: gray;
  border-radius: 50%;
`;

export const DateThread = styled.p`
  color: ${({ color }) => colors[color]};
`;
DateThread.defaultProps = {
  color: '#334155',
};

export const ParagrapfThread = styled.p`
  font-weight: bold;
  color: ${({ color }) => colors[color]};
`;
ParagrapfThread.defaultProps = {
  color: '#334155',
};

export const NameOwnerThread = styled.p`
  font-weight: bold;
  color: ${({ color }) => colors[color]};
`;
NameOwnerThread.defaultProps = {
  color: '#334155',
};

export function ItemThreadNew({ thread }) {
  return (
    <>
      <GlobalCss />
      <>
        <GlobalCss />
        <ItemThreadContainer>
          <ThreadTitle>Pengalaman Belajar Dicoding</ThreadTitle>
          <ThreadCategory>#React</ThreadCategory>
          <WrapperItemThread>
            <ImageThread />
            <NameOwnerThread>Muhammad</NameOwnerThread>
            <DateThread>57 days ago</DateThread>
          </WrapperItemThread>
          <ThreadBody>Bagaimana kabarmu? Semoga baik-baik saja ya. ...</ThreadBody>
          <WrapperItemThread>
            <WrapperItemThread style={{ gap: '5px' }}>
              <IconContainer><AiOutlineLike /></IconContainer>
              <ParagrapfThread>2</ParagrapfThread>
            </WrapperItemThread>
            <WrapperItemThread style={{ gap: '5px' }}>
              <IconContainer><AiOutlineDislike /></IconContainer>
              <ParagrapfThread>2</ParagrapfThread>
            </WrapperItemThread>
          </WrapperItemThread>
          <WrapperItemThread>
            <IconContainer>
              <BiCommentDots />
            </IconContainer>
            <ParagrapfThread>2</ParagrapfThread>
            <ParagrapfThread>Komentar</ParagrapfThread>
          </WrapperItemThread>
        </ItemThreadContainer>
      </>
    </>
  );
}
