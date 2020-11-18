FROM python:3.7-alpine

ENV APP_HOME=/usr/src/app
WORKDIR ${APP_HOME}

ENV PYTHONBUFFERED 1
ENV PYTHONWRITEBYTECODE 1

RUN apk update && apk add gcc libc-dev make git libffi-dev \
    openssl-dev python3-dev libxml2-dev libxslt-dev

RUN addgroup -S app && adduser --home /usr/src/app --shell /bin/bash -S app -G app

COPY requirements.txt $APP_HOME
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN apk add iputils

COPY . $APP_HOME

RUN chmod +x entrypoint.sh

RUN chown -R app:app $APP_HOME

USER app:app

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
