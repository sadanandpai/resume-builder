import React from 'react';

const Maybe = ({ test, children }: { test: boolean; children: any }) => <>{test && children}</>;

export default Maybe;
