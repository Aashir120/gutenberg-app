import { BookApi, BookApiTagTypes } from "./main.api";

// Define a service using a base URL and expected endpoints
export const announcementApi = BookApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<
      {
        response: {
          book_id: number;
          id: number;
          author?: string;
          meta_data: string;
          content: string;
          title?: string;
        }[];
      },
      void
    >({
      query: () => ({
        url: `books`,
        method: "GET",
      }),
      providesTags: [BookApiTagTypes.Books],
    }),
    getBookDetail: builder.query<
      {
        response: {
          book_id: number;
          id: number;
          author?: string;
          meta_data: string;
          content: string;
          title?: string;
        };
      },
      {
        book_id: number;
      }
    >({
      query: ({ book_id }) => ({
        url: `books/${book_id}`,
        method: "GET",
      }),
      providesTags: [BookApiTagTypes.Books, BookApiTagTypes.Analyze],
    }),
    getAnalyze: builder.mutation<
      {
        response: string;
      },
      {
        book_id: number;
      }
    >({
      query: ({ book_id }) => ({
        url: `analyze/${book_id}`,
        method: "GET",
      }),
      invalidatesTags: [BookApiTagTypes.Books, BookApiTagTypes.Analyze],
    }),
  }),
  overrideExisting: "throw",
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBooksQuery,
  useLazyGetBookDetailQuery,
  useGetAnalyzeMutation,
} = announcementApi;
