@echo off
REM !/bin/bash

REM Nimbella CONFIDENTIAL
REM ---------------------

REM   2018 - present Nimbella Corp
REM   All Rights Reserved.

REM NOTICE:

REM All information contained herein is, and remains the property of
REM Nimbella Corp and its suppliers, if any.  The intellectual and technical
REM concepts contained herein are proprietary to Nimbella Corp and its
REM suppliers and may be covered by U.S. and Foreign Patents, patents
REM in process, and are protected by trade secret or copyright law.

REM Dissemination of this information or reproduction of this material
REM is strictly forbidden unless prior written permission is obtained
REM from Nimbella Corp.


REM !/bin/bash

cd nimbus-ui

IF EXIST ..\..\..\.env copy ..\..\..\.env .env.production

set PUBLIC_URL=/nimbus

IF EXIST build rd /S /Q build

npm install && npm run build && cd ..
