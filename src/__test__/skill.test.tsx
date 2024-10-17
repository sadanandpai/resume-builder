// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { render, screen, waitFor } from '@testing-library/react';
// import { ISkillItem } from 'src/stores/skill.interface';
// import Skill from 'src/modules/builder/editor/modules/skills/components/Skill';

// let items = [
//   { name: 'JavaScript', level: 60 },
//   { name: 'HTML', level: 40 },
//   { name: 'CSS', level: 80 },
// ];

// const addItem = jest.fn(({ name, level }: ISkillItem) => {
//   items.push({ name, level });
// });

// const removeItem = jest.fn((index: number) => {
//   items.splice(index, 1);
// });

// const editItem = jest.fn(
//   ({ name, level, index }: { name: string; level: number; index: number }) => {
//     items[index] = { name, level };
//   }
// );

// const setItems = jest.fn((values: ISkillItem[]) => {
//   items = values;
// });

// const hasLevel = true;

// it('should show the list of skills', async () => {
//   render(
//     <Skill
//       items={items}
//       editItem={editItem}
//       addItem={addItem}
//       removeItem={removeItem}
//       setItems={setItems}
//       hasLevel={hasLevel}
//     />
//   );

//   const skillPillEls = screen.queryAllByTestId('skill-pill');
//   expect(skillPillEls.length).toBe(items.length);

//   const skillTitleEls = screen.queryAllByTestId('skill-title');
//   expect(skillPillEls.length).toBe(items.length);

//   for (let index = 0; index < skillTitleEls.length; index++) {
//     expect(skillTitleEls[index].textContent).toBe(items[index].name);
//   }
// });

// it('should delete the skills', async () => {
//   render(
//     <Skill
//       items={items}
//       editItem={editItem}
//       addItem={addItem}
//       removeItem={removeItem}
//       setItems={setItems}
//       hasLevel={hasLevel}
//     />
//   );

//   const skillPillEls = screen.queryAllByTestId('skill-pill');
//   const user = userEvent.setup();

//   for (const skillPill of skillPillEls) {
//     const randomIndex = Math.floor(Math.random() * items.length);
//     const deleteEl = skillPillEls[randomIndex].querySelector('.deleteButton');

//     if (deleteEl) {
//       user.click(deleteEl);
//     }
//     await waitFor(() => {
//       expect(removeItem).toHaveBeenCalledWith(randomIndex);
//     });
//   }
//   await waitFor(() => {
//     expect(items.length).toBe(0);
//   });
// });
