import { useQuery, UseQueryOptions } from 'react-query';

import api from 'constants/api';
import HttpError from 'utils/HttpError';
import { ErrorHandler, RootComment } from 'types';
import { resolveHttpError } from 'utils/error';

interface CustomQueryOption extends UseQueryOptions<RootComment[], HttpError> {
  feedId: number;
  errorHandler?: ErrorHandler;
}

const readComment = async (feedId: number, errorHandler?: ErrorHandler) => {
  try {
    const { data } = await api.get(`/feeds/${feedId}/comments`);

    return data;
  } catch (error) {
    resolveHttpError({
      error,
      defaultErrorMessage: '댓글 읽기에 에러가 발생했습니다',
      errorHandler,
    });
  }
};

const useCommentRead = ({ feedId, errorHandler, ...option }: CustomQueryOption) => {
  return useQuery<RootComment[], HttpError>(
    ['comment', feedId],
    () => readComment(feedId, errorHandler),
    option,
  );
};

export default useCommentRead;
