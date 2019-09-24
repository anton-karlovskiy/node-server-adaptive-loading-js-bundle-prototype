/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Fragment, useEffect, useState, Suspense, lazy } from 'react';
import LazyLoadingErrorBoundary from '../LazyLoadingErrorBoundary';

const LazyHeavy = lazy(() => import(/* webpackChunkName: "heavy" */ './Heavy'));
const LazyLight = lazy(() => import(/* webpackChunkName: "light" */ './Light'));

const Loading = () => <Fragment>Loading...</Fragment>;

const AdaptiveViewer = ({ imageUrl }) => {
  const [experienceType, setExperienceType] = useState(null);
  useEffect(() => {
    fetch('/network-memory-considerate-js-loading')
      .then(response => response.json())
      .then(result => {
        setExperienceType(result.experienceType);
      })
      .catch(error => {
        console.log('[AdaptiveViewer] error => ', error);
      });
  }, []);

  if (!experienceType) return <Loading />;
  console.log('[AdaptiveViewer] experienceType => ', experienceType);

  return (
    <Fragment>
      <LazyLoadingErrorBoundary>
        <Suspense fallback={<Loading />}>
          { experienceType === 'heavy' && (
            <LazyHeavy imageUrl={imageUrl} width='90%' />
          ) }
          { experienceType === 'light' && (
            <LazyLight imageUrl={imageUrl} width='90%' />
          ) }
        </Suspense> 
      </LazyLoadingErrorBoundary>
    </Fragment>
  );
};

export default AdaptiveViewer;
