import React from "react";
import styled from "styled-components";
import { Input as AntInput, DatePicker as AntDatePicker } from "antd";
import EditData from "../../common/inputData.json";
import { Section } from "../../common/styles";
import { InputBlock } from "../../widgets/InputBlock";

const Topic = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
`;

const Wrapper = styled.div`
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled(AntInput)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`;

const DatePicker = styled(AntDatePicker)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`;

const Divider = styled.div`
  height: 1px;
  background: #424242;
`;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  height: 100vh;
  background: #222;
`;

const Heading = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin-bottom: 0;
`;

const fields: any = {
  Input: <Input />,
  Datepicker: <DatePicker />,
  Block: (fields: any) => <InputBlock fields={fields} />,
};

export const EditSettings = () => {
  return (
    <Container>
      {EditData.map((data) => (
        <>
          <Heading>{data.section}</Heading>
          <Wrapper id={data.section}>
            {data.metadata.map((item: any) => (
              <Section size={item.size}>
                {item.type !== "Block" ? (
                  <>
                    <Topic>{item.label}</Topic>
                    {fields[item.type]}
                  </>
                ) : (
                  fields[item.type](item.fields)
                )}
              </Section>
            ))}
          </Wrapper>
          <Divider />
        </>
      ))}
    </Container>
  );
};
