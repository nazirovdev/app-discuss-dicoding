import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BiCommentDots } from 'react-icons/bi';
import PropTypes from 'prop-types';
import {
  DateThread,
  ImageThread,
  ItemThreadContainer, ThreadBody, ThreadCategory, ThreadTitle, WrapperItemThread, NameOwnerThread, ParagrapfThread, IconContainer,
} from '../components/atoms/ItemThreadComp';
import { GlobalCss } from '../components/atoms/NavbarComp';

export function ItemThreadComp(args) {
  return (
    <>
      <GlobalCss />
      <ItemThreadContainer {...args}>
        <ThreadTitle {...args}>Pengalaman Belajar Dicoding</ThreadTitle>
        <ThreadCategory {...args}>#React</ThreadCategory>
        <WrapperItemThread>
          <ImageThread />
          <NameOwnerThread {...args}>Muhammad</NameOwnerThread>
          <DateThread {...args}>57 days ago</DateThread>
        </WrapperItemThread>
        <ThreadBody {...args}>Bagaimana kabarmu? Semoga baik-baik saja ya. ...</ThreadBody>
        <WrapperItemThread>
          <WrapperItemThread style={{ gap: '5px' }}>
            <IconContainer {...args}><AiOutlineLike /></IconContainer>
            <ParagrapfThread {...args}>2</ParagrapfThread>
          </WrapperItemThread>
          <WrapperItemThread style={{ gap: '5px' }}>
            <IconContainer {...args}><AiOutlineDislike /></IconContainer>
            <ParagrapfThread {...args}>2</ParagrapfThread>
          </WrapperItemThread>
        </WrapperItemThread>
        <WrapperItemThread>
          <IconContainer {...args}>
            <BiCommentDots />
          </IconContainer>
          <ParagrapfThread {...args}>2</ParagrapfThread>
          <ParagrapfThread {...args}>Komentar</ParagrapfThread>
        </WrapperItemThread>
      </ItemThreadContainer>
    </>
  );
}

ItemThreadComp.propTypes = {
  /** type of bgColor to change the color background ItemThreadComp */
  bgColor: PropTypes.string,
  /** type of txtColor to change the color ItemThreadComp */
  color: PropTypes.string,
};
