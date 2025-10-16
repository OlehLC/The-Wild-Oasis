import styled, {css} from "styled-components";

const Row= styled.div`
display :flex;
    
    ${(props)=>props.type==='horizontal'&& css`
    justify-content: space-between;
        align-items: center;
         @media (max-width: 630px) {
   display: flex;
      flex-direction: column;
    gap: 2.4rem;
  }
        
    `}
      ${(props)=>props.type==='horizontal1'&& css`
    justify-content: space-between;
        align-items: center;
         @media (max-width: 800px) {
   display: flex;
      flex-direction: column;
    gap: 2.4rem;
  }
        
    `}
    ${(props)=>props.type==='vertical'&& css`
    flex-direction: column;
        gap:1.6rem;
    `}
`
Row.defaultProps={
    type:'vertical',
}
export default Row