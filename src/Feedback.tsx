import * as React from 'react';

import { Label, PrimaryButton, Stack, TextField, mergeStyleSets } from '@fluentui/react';

import { AiOutlineComment } from 'react-icons/ai';
import { Comment } from './Models/Comment';
import { Comments } from './Comments';
import { GAP10 } from './Constants';

export interface IFeedbackProps { }

const styles = mergeStyleSets({
    textfield: { width: '100%', borderRadius: '10px', overflow: 'show' },
    submitButton: { width: '100px', borderRadius: '10px' },
    feedbackContainer: { width: '500px', borderRadius: '10px', border: '1px solid black', padding: '10px' },
    header: { backgroundColor: 'black', color: 'white', padding: '10px', boxShadow: '0px 0px 10px 0px grey', marginTop: '10px', position: 'sticky', top: 0, zIndex: 3 },
    label: { color: "white" },
    name: { width: '100px' }
})

export type ReducerState = { allComments: Comment[], name: string, comment: string, id: string, url: string, likes: number, date: string, loading: boolean };
const initialState: ReducerState = { loading: true, name: '', comment: '', allComments: [], id: '', url: '', likes: 0, date: '' }

export type ReducerAction =
    { type: 'init', payload: Partial<ReducerState> } |
    { type: 'addComment' } |
    { type: 'SETNAME', payload: string } |
    { type: 'SETCOMMENT', payload: string } |
    { type: 'like', payload: Partial<Comment> } |
    { type: 'dislike', payload: Partial<Comment> };


const reducer = (state: ReducerState, action: ReducerAction) => {
    switch (action.type) {
        case 'init':
            return { ...state, ...action.payload };
        case 'like':
            return {
                ...state,
                allComments: state.allComments.map(comment => {
                    if (comment.id === action.payload.id) {
                        return { ...comment, likes: comment.likes + 1 };
                    }
                    return comment;
                })
            };
        case 'dislike':
            return {
                ...state,
                allComments: state.allComments.map(comment => {
                    if (comment.id === action.payload.id) {
                        return { ...comment, likes: comment.likes - 1 };
                    }
                    return comment;
                })
            };
        case 'addComment': {
            let newComment: Comment = {
                id: Math.random().toString(),
                date: new Date().toDateString(),
                likes: 0,
                url: 'https://picsum.photos/200',
                comment: state.comment,
                name: state.name
            }
            return {
                ...state,
                allComments: [newComment, ...state.allComments],
                name: '',
                comment: ''
            };
        }
        case 'SETNAME':
            return { ...state, name: action.payload };
        case 'SETCOMMENT':
            return { ...state, comment: action.payload };
        default:
            return state;
    }
}

export const Feedback: React.FunctionComponent<IFeedbackProps> = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { comment, allComments, name } = state;

    React.useEffect(() => {
        const controller = new AbortController();
        fetch('comments.json', { signal: controller.signal })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'init', payload: { allComments: data.sort((a: Comment, b: Comment) => new Date(b.date).getTime() - new Date(a.date).getTime()) } });
            });
        return () => {
            controller.abort();
        }
    }, []);

    const remainingChars = 180 - comment.length;
    const isValid = comment.length > 0 && name.length > 0;

    return (
        <>
            <Stack horizontalAlign='center' className={styles.header} >
                <Stack horizontal verticalAlign='center'>
                    <AiOutlineComment size={20} color='blue' />
                    <h3>Musikiss Listens!</h3>
                </Stack>
                <Label className={styles.label}> We'd love to hear from you!</Label>
                <Stack className={styles.feedbackContainer} tokens={GAP10}>

                    <TextField
                        className={styles.textfield}
                        multiline
                        placeholder='Enter your feedback here'
                        borderless
                        maxLength={180}
                        resizable={false}
                        value={comment}
                        onChange={(_, value) => dispatch({ type: 'SETCOMMENT', payload: value ?? '' })}
                    />
                    <TextField
                        placeholder='Name'
                        borderless maxLength={20}
                        value={name}
                        onChange={(e, value) => dispatch({ type: 'SETNAME', payload: value ?? '' })}
                        className={styles.name}
                    />
                    <Stack horizontalAlign='space-between' horizontal>
                        <div>{remainingChars}</div>
                        <PrimaryButton
                            disabled={!isValid}
                            className={styles.submitButton}
                            onClick={() => dispatch({ type: 'addComment' })}
                        >
                            Submit
                        </PrimaryButton>
                    </Stack>
                </Stack>

            </Stack>
            {
                allComments.map((comment) => {
                    return <Comments key={comment.id} comment={comment} dispatch={dispatch} />
                })
            }
        </>
    );
};




