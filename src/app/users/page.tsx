'use client';
import { fetchCategoriesRequest } from '@/redux-store/category.slice';
import { fetchNewsRequest } from '@/redux-store/newsSlice.slice';
import { AppDispatch, RootState } from '@/redux-store/store';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Article } from '@/redux-store/newsSlice.slice';

const UserComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    allArticles,
    // status: newsStatus,
    // error: newsError,
    // total,
    // skip,
  } = useSelector((state: RootState) => state.news);
  const {
    categories,
    // status: categoriesStatus,
    // error: categoriesError,
  } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchNewsRequest({ skip: 0, limit: 30 }));
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const articlesFilter = allArticles.slice(0, 4);
  const articles = allArticles.slice(4);

  const sortedArticles = articles.sort(
    (a, b) => new Date(b.ngayTao).getTime() - new Date(a.ngayTao).getTime(),
  );

  // console.log(sortedArticles);
  // console.log('articles', articles);
  // console.log(newsStatus !== 'loading');
  // console.log('total:', total);
  // console.log('articlesFilter', allArticles.length < total);

  // console.log(allArticles);

  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  return (
    <>
      <Box sx={{ maxWidth: '1320px', margin: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0px',
            borderBottom: '1px solid black',
            maxWidth: '100%',
          }}
        >
          {categories.map((item, i) => (
            <Box key={i}>
              <Typography variant="h2" sx={{ fontSize: '20px', cursor: 'pointer' }}>
                {item.tenDanhMuc}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <Grid container spacing={2} sx={{ display: 'flex' }}>
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
              {articlesFilter.length > 0 && articlesFilter[0] && (
                <Card className="mb-4" sx={{ flex: 1 }}>
                  <Link
                    href={articlesFilter[0].urlChiTiet}
                    target=""
                    rel=""
                    style={{ textDecoration: 'none' }}
                  >
                    <CardContent
                      sx={{
                        position: 'relative',
                        objectFit: 'cover',
                        color: '#fff',
                        height: '100%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '16px',
                        backgroundImage: `url(${articlesFilter[0].anhDaiDien})`,
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          margin: '8px',
                          padding: '4px',
                          fontSize: '25px',
                          background: '#7FFFD4',
                          borderRadius: '4px',
                        }}
                      >
                        {articlesFilter[0].tieuDe}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ marginBottom: '25px', fontWeight: 'bold' }}
                      >
                        {articlesFilter[0].tomTat}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              {articlesFilter.slice(1, 4).map(
                (article, index) =>
                  article && (
                    <Card key={article.id} className="mb-4" sx={{ marginBottom: '10px' }}>
                      <Link
                        href={article.urlChiTiet}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <CardContent
                          sx={{
                            position: 'relative',
                            objectFit: 'cover',
                            color: '#fff',
                            height: '150px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '16px',
                            backgroundImage: `url(${article.anhDaiDien})`,
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              borderRadius: '8px',
                            }}
                          ></Box>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              fontSize: '15px',
                              margin: '8px',
                              padding: '4px',
                              background: '#7FFFD4',
                              borderRadius: '4px',
                            }}
                          >
                            {truncateText(article.tieuDe, 40)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontSize: '18px',
                              color: 'black',
                              fontWeight: 'bold',
                            }}
                          >
                            {truncateText(article.tomTat, 50)}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  ),
              )}
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            className="mt-4"
            sx={{ marginTop: '20px', marginBottom: '80px' }}
          >
            {sortedArticles.map(
              (article, index) =>
                article && (
                  <Grid item xs={12} md={4} lg={3} key={article.id}>
                    <Card className="mb-4">
                      <Link
                        style={{ textDecoration: 'none' }}
                        href={article.urlChiTiet}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={article.anhDaiDien}
                          alt={article.tieuDe}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ color: 'black', fontWeight: 'bold' }}
                          >
                            {truncateText(article.tieuDe, 50)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {article.tomTat}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                ),
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UserComponent;
