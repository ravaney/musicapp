import { IconButton, Label, Stack, mergeStyleSets } from '@fluentui/react';
import * as React from 'react';
import { Comment } from './Models/Comment';
import { GAP10 } from './Constants';
import { BsFillBalloonHeartFill } from 'react-icons/bs';
import { ReducerAction } from './Feedback';


export interface ICommentsProps {
    comment: Comment,
    dispatch: React.Dispatch<ReducerAction>
}

const styles = mergeStyleSets({
    main: { margin: '10px 40px', padding: '10px', boxShadow: '0px 0px 10px 0px grey', },
    label: { width: '150px', textAlign: 'right' },
    name: { fontWeight: 'bold', textAlign: 'left' },
    image: { borderRadius: '5px', margin: '0px', height: '100px', width: '100px' },
    likes: { color: 'pink', minWidth: '50px' }
})

export const Comments: React.FunctionComponent<ICommentsProps> = ({ comment, dispatch }) => {
    const [canUpvoteComment, setCanUpvoteComment] = React.useState(true);

    const handleLike = () => {
        dispatch({ type: 'like', payload: { id: comment.id } })
        setCanUpvoteComment(false);
    }
    const handleDislike = () => {
        dispatch({ type: 'dislike', payload: { id: comment.id } })
        setCanUpvoteComment(true);
    }
    return (
        <Stack
            horizontal
            verticalAlign='end'
            className={styles.main}
            tokens={GAP10} horizontalAlign='space-between'
        >

            <Stack horizontal verticalAlign='center' tokens={GAP10} horizontalAlign='start'>
                <Stack horizontal verticalAlign='center' className={styles.likes} horizontalAlign='center' >
                    <BsFillBalloonHeartFill color='pink' />
                    <div>{comment.likes}</div>
                </Stack>
                <img src={comment.url} alt='user' className={styles.image} />
                <Stack>
                    <Label className={styles.name}>{comment.name}</Label>
                    <div>{comment.comment}</div>
                </Stack>
            </Stack>
            <Stack verticalAlign='center' tokens={GAP10}>
                <IconButton
                    disabled={!canUpvoteComment}
                    iconProps={{ iconName: 'Like' }}
                    onClick={handleLike}

                />
                <IconButton
                    disabled={canUpvoteComment}
                    iconProps={{ iconName: 'Dislike' }}
                    onClick={handleDislike}

                />
                <Label className={styles.label}>{comment.date}</Label>
            </Stack>

        </Stack>
    );
};
