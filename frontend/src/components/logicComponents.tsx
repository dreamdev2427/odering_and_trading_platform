import React from 'react';

export type ConditionalComponentProps<TParams> = Partial<TParams> & {
  ifTrue?: boolean;
  ifFalse?: boolean;
};
type ConditionProps<A = any> = {
  value: any;
  children: React.ReactElement<ConditionalComponentProps<A>>[];
};
// Condition component, displays first component if value is true and others if false
export const Condition = (props: ConditionProps) => {
  return (
    <>
      {React.Children.map(props.children, (element, index) =>
        (!element.props.ifTrue && !element.props.ifFalse && (index === 0) === !!props.value) ||
        (props.value && element.props.ifTrue) ||
        (!props.value && element.props.ifFalse)
          ? element
          : null,
      )}
    </>
  );
};

// export type WKey = {
//   key?: any;
//   id?: any;
// };
//
// export type Listified<A extends { data: any }> = {
//   data: A['data'][];
//   childProps: Omit<A, 'data'>;
// };

// type ListOverload = {
//   <A>(props: {
//     data: A[] | null | undefined | Maybe<A[]>;
//     component: (props: { data: A }) => React.ReactElement;
//   }): React.ReactElement;
//   <A, B>(props: {
//     data: A[] | null | undefined | Maybe<A[]>;
//     component: (props: { data: A } & B) => React.ReactElement;
//     childProps: B;
//   }): React.ReactElement;
// };
// export const List: ListOverload = (props: any) => (
//   <>
//     {(Maybe.isMaybe(props.data) ? props.data : Maybe.fromNullable(props.data))
//       .orDefault([])
//       .map((item: any, index: any) => (
//         <props.component
//           key={Maybe.fromNullable((item as WKey).key)
//             .alt(Maybe.fromNullable((item as WKey).id))
//             .orDefault(index)}
//           data={item}
//           {...props.childProps}
//         />
//       ))}
//   </>
// );

// export type DraggableComponentProps<T> = {
//     data: T;
//     dragHandleProps: DraggableProvidedDragHandleProps | undefined;
// };
//
// export type wID = {
//     id: string;
// };
// export const DraggableList = <A extends wID, T>(props: {
//     childProps: T;
//     data: A[] | null | undefined | Maybe<A[]>;
//     component: (props: T & DraggableComponentProps<A>) => React.ReactElement;
//     onDragEnd: (
//         result: DropResult,
//         provided: ResponderProvided
//     ) => void | undefined;
// }) => (
//     <DragDropContext onDragEnd={props.onDragEnd}>
//         <Droppable droppableId={"list"} type={"category"}>
//             {(provided) => (
//                 <div ref={provided.innerRef} {...provided.droppableProps}>
//                     {(Maybe.isMaybe(props.data)
//                         ? props.data
//                         : Maybe.fromNullable(props.data)
//                     )
//                         .orDefault([])
//                         .map((item, index) => (
//                             <Draggable
//                                 key={item.id}
//                                 draggableId={item.id}
//                                 index={index}
//                             >
//                                 {(provided) => (
//                                     <div
//                                         {...provided.draggableProps}
//                                         ref={provided.innerRef}
//                                     >
//                                         <props.component
//                                             {...props.childProps}
//                                             data={item}
//                                             dragHandleProps={
//                                                 provided.dragHandleProps
//                                             }
//                                         />
//                                     </div>
//                                 )}
//                             </Draggable>
//                         ))}
//                     {provided.placeholder}
//                 </div>
//             )}
//         </Droppable>
//     </DragDropContext>
// );
